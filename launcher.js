/*
 * Copyright (C) 2012 Aleksey Lim
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

enyo.kind({
    name: "App",
    classes: "app enyo-unselectable",

    components: [
        {classes: "cell", url: "http://localhost:5000/", ontap: "_ontap", components: [
            {kind: "Image", classes: "icon", src: "images/webui.png"},
            {classes: "title", content: "Web UI"},
            {classes: "summary", content: "Web application targeted to low aged users."},
        ]},
        {classes: "cell", url: "http://localhost:5001/hub/", ontap: "_ontap", components: [
            {kind: "Image", classes: "icon", src: "images/hub.png"},
            {classes: "title", content: "Contributor Hub"},
            {classes: "summary", content:
                "Javascript application targeted to content creators and providers, e.g., " +
                "activity developers or deployment supporters. As well as experienced users.",
            },
        ]},
    ],

    _ontap: function(sender) {
        window.open(sender.url, "_self");
    },
});
