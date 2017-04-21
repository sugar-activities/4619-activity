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

from os.path import isabs
from gettext import gettext as _
from os.path import exists

import gtk

from sugar import profile
from sugar.graphics import style
from sugar.graphics.icon import Icon
from sugar.graphics.toolbutton import ToolButton

from jarabe import config


class ReportWindow(gtk.Window):

    __gtype_name__ = 'ReportWindow'

    def __init__(self, client, event):
        gtk.Window.__init__(self)
        self._client = client
        self._event = event

        self.set_decorated(False)
        self.set_position(gtk.WIN_POS_CENTER_ALWAYS)
        self.set_border_width(style.LINE_WIDTH)

        window = gtk.VBox()
        self.add(window)

        toolbar = gtk.Toolbar()
        window.pack_start(toolbar, False)

        icon = Icon()
        icon.set_from_icon_name('emblem-warning', gtk.ICON_SIZE_LARGE_TOOLBAR)
        icon.props.xo_color = profile.get_color()
        tool_item = gtk.ToolItem()
        tool_item.add(icon)
        toolbar.insert(tool_item, -1)

        separator = gtk.SeparatorToolItem()
        separator.props.draw = False
        separator.set_size_request(style.DEFAULT_SPACING, -1)
        toolbar.insert(separator, -1)

        title = gtk.Label(_('Submit failure report'))
        tool_item = gtk.ToolItem()
        tool_item.add(title)
        toolbar.insert(tool_item, -1)

        separator = gtk.SeparatorToolItem()
        separator.props.draw = False
        separator.set_expand(True)
        toolbar.insert(separator, -1)

        submit = ToolButton('dialog-ok', tooltip=_('Submit'))
        submit.connect('clicked', lambda button: self._submit())
        toolbar.insert(submit, -1)

        cancel = ToolButton('dialog-cancel', tooltip=_('Cancel'))
        cancel.connect('clicked', lambda button: self.destroy())
        toolbar.insert(cancel, -1)

        bg = gtk.EventBox()
        bg.modify_bg(gtk.STATE_NORMAL, style.COLOR_WHITE.get_gdk_color())
        window.pack_start(bg)

        canvas = gtk.VBox()
        canvas.set_border_width(style.DEFAULT_SPACING)
        canvas.props.spacing = style.DEFAULT_SPACING
        bg.add(canvas)

        box = gtk.HBox()
        box.props.spacing = style.DEFAULT_SPACING
        canvas.pack_start(box, False)
        if 'icon' in event:
            icon = Icon(file=event['icon'], pixel_size=style.XLARGE_ICON_SIZE)
        else:
            icon = Icon()
            icon.set_from_icon_name('emblem-warning',
                    gtk.ICON_SIZE_LARGE_TOOLBAR)
        box.pack_start(icon, False)
        label = gtk.Label()
        label.props.use_markup = True
        if 'solution' in event:
            activity_name = '%(name)s-%(version)s' % event['solution'][0]
        else:
            activity_name = event['context']
        label.props.label = '<b>%s</b>\n%s' % (activity_name, event['error'])
        label.props.wrap = True
        box.pack_start(label, False)

        frame = gtk.Frame(_('Optionally, describe the problem in common sentences'))
        canvas.pack_start(frame)
        self._message = gtk.TextView()
        scrolled = gtk.ScrolledWindow()
        scrolled.set_policy(gtk.POLICY_NEVER, gtk.POLICY_AUTOMATIC)
        scrolled.set_border_width(style.DEFAULT_PADDING)
        scrolled.add(self._message)
        frame.add(scrolled)

        frame = gtk.Frame(_('Log'))
        canvas.pack_start(frame)
        text = gtk.TextView()
        text.props.editable = False
        if 'trace' in event:
            text.props.buffer.props.text = '\n'.join(event['trace'])
        scrolled = gtk.ScrolledWindow()
        scrolled.set_policy(gtk.POLICY_AUTOMATIC, gtk.POLICY_AUTOMATIC)
        scrolled.set_border_width(style.DEFAULT_PADDING)
        scrolled.add(text)
        frame.add(scrolled)

        self.show_all()
        self.set_focus(self._message)

        self.connect('realize', self.__realize_cb)

        gap = style.GRID_CELL_SIZE
        width = gtk.gdk.screen_width() - gap * 2
        height = gtk.gdk.screen_height() - gap * 2
        self.set_size_request(width, height)
        self.move(gap, gap)

    def do_key_press_event(self, event):
        if event.keyval == gtk.keysyms.Escape:
            self.destroy()
        elif event.keyval == gtk.keysyms.Return and \
                event.state & gtk.gdk.CONTROL_MASK:
            self._submit()
        else:
            gtk.Window.do_key_press_event(self, event)

    def _submit(self):
        props = {'description': self._message.props.buffer.props.text,
                 'context': self._event['context'],
                 'error': self._event['error'],
                 'environ': _get_environ(),
                 }
        if 'trace' in self._event:
            props['environ']['trace'] = self._event['trace']
        if 'solution' in self._event:
            props['environ']['solution'] = self._event['solution']
            impl = self._event['solution'][0]
            if not isabs(impl['id']):
                props['implementation'] = impl['id']
            props['version'] = impl['version']

        report = self._client.post(['report'], props)

        log_path = self._event.get('log_path')
        if log_path and exists(log_path):
            with file(log_path, 'rb') as f:
                self._client.request('PUT', ['report', report, 'data'], f)

        self.destroy()

    def __realize_cb(self, widget):
        self.window.set_type_hint(gtk.gdk.WINDOW_TYPE_HINT_DIALOG)
        self.window.set_accept_focus(True)

        parent = gtk.gdk.window_foreign_new(self._parent_window_xid)
        self.window.set_transient_for(parent)


def _get_environ():
    import platform
    from sugar_network.zerosugar import lsb_release

    return {'lsb_distributor_id': lsb_release.distributor_id(),
            'lsb_release': lsb_release.release(),
            'os': platform.linux_distribution(),
            'uname': platform.uname(),
            'python': platform.python_version_tuple(),
            'sugar': config.version,
            }
