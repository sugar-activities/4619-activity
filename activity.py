# Copyright (C) 2012 Aleksey Lim
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

import os
import sys
import time
import logging
import subprocess
from os.path import dirname, abspath, join

import gtk
import gobject

from sugar.graphics import style
from sugar.graphics.icon import Icon
from sugar.activity.activity import show_object_in_journal, Activity

launcher_url = 'file://%s/launcher.html' % dirname(abspath(__file__))
src_root = os.environ['SUGAR_BUNDLE_PATH']
bin_packages = join(src_root, 'bin-packages')
site_packages = join(src_root, 'site-packages')
sys.path.insert(0, site_packages)

from sugar_network import IPCClient, sugar
from active_toolkit.options import Option
from report import ReportWindow


class SugarNetworkActivity(Activity):

    def __init__(self, *args, **kwargs):
        Activity.__init__(self, *args, **kwargs)
        self._webkit = None
        pythonpath = []

        try:
            import webkit
        except ImportError:
            self.set_canvas(self._alert('PyWebKitGtk is not installed.'))
            return

        try:
            import M2Crypto
        except ImportError:
            self.set_canvas(self._alert('M2Crypto is not installed.'))
            return

        try:
            import gevent
            if gevent.version_info[0] < 1:
                raise ImportError()
        except ImportError:
            sys.path.insert(0, bin_packages)
            try:
                import gevent
            except ImportError:
                error = 'gevent-1.0 is not installed.'
                self.set_canvas(self._alert(error))
                return
            pythonpath.append(bin_packages)

        pythonpath.append(site_packages)
        if 'PYTHONPATH' in os.environ:
            pythonpath.append(os.environ.get('PYTHONPATH'))
        os.environ['PYTHONPATH'] = ':'.join(pythonpath)
        returncode = subprocess.call([
            'sugar-network-client', 'graceful_start', '-DDD',
            '--hub-root', join(src_root), '--webui', '--lazy-open',
            ], env=os.environ)
        if returncode:
            error = 'Fail to start sugar-network-client. ' \
                    'See log file for details.'
            self.set_canvas(self._alert(error))
            return

        self._sn_plugin_started = False
        try:
            from jarabe.plugins import plugins, sn

            Option.seek('shell', [plugins])
            Option.load([
                '/etc/sweets.conf',
                '~/.config/sweets/config',
                sugar.profile_path('sweets.conf'),
                ])
            self._sn_plugin_started = 'sn' in plugins.value
        except ImportError:
            pass

        self._client = IPCClient()
        self._subscription = self._client.subscribe()
        gobject.io_add_watch(self._subscription.fileno(),
                gobject.IO_IN | gobject.IO_HUP, self.__subscription_cb)

        self._webkit = webkit.WebView()
        self._webkit.show()
        scrolled = gtk.ScrolledWindow()
        scrolled.set_policy(gtk.POLICY_AUTOMATIC, gtk.POLICY_AUTOMATIC)
        scrolled.set_shadow_type(gtk.SHADOW_NONE)
        scrolled.add(self._webkit)
        scrolled.show()
        self.set_canvas(scrolled)

        self._webkit.open(launcher_url)

    def read_file(self, file_path):
        with file(file_path) as f:
            self._webkit.open(f.read().strip())

    def write_file(self, file_path):
        if self._webkit is None:
            return
        with file(file_path, 'w') as f:
            f.write(self._webkit.props.uri)

    def _alert(self, message):
        bg = gtk.EventBox()
        bg.modify_bg(gtk.STATE_NORMAL, style.COLOR_WHITE.get_gdk_color())

        canvas = gtk.VBox()
        canvas.set_border_width(style.GRID_CELL_SIZE)
        canvas.props.spacing = style.DEFAULT_SPACING
        bg.add(canvas)

        box = gtk.HBox()
        box.props.spacing = style.DEFAULT_SPACING
        canvas.pack_start(box)

        icon = Icon(pixel_size=style.LARGE_ICON_SIZE)
        icon.set_from_icon_name('emblem-warning', gtk.ICON_SIZE_LARGE_TOOLBAR)
        box.pack_start(icon, False)

        label = gtk.Label()
        label.props.use_markup = True
        label.props.label = '<b>Error</b>\n%s' % message
        box.pack_start(label, False)

        bg.show_all()
        return bg

    def __subscription_cb(self, source, cb_condition):
        try:
            event = self._subscription.pull()
            if event is not None:
                event_type = event['event']
                if event_type == 'show_journal':
                    show_object_in_journal(event['uid'])
                elif event_type == 'launch' and event['state'] == 'failure':
                    if not self._sn_plugin_started:
                        ReportWindow(self._client, event).show()
        except Exception:
            logging.exception('Cannot dispatch %r event', event)
        return True
