importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "add_game.html",
    "revision": "532a86b76059919ef2bf9da8672f353f"
  },
  {
    "url": "add_player.html",
    "revision": "c1b0eaa4b562932ba2334efe2838b2ba"
  },
  {
    "url": "build/sw.js",
    "revision": "f4e75a26a21b96ea166d049cb8f81a52"
  },
  {
    "url": "build/workbox-sw.prod.v2.1.2.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  },
  {
    "url": "build/workbox-sw.prod.v2.1.2.js.map",
    "revision": "8e170beaf8b748367396e6039c808c74"
  },
  {
    "url": "edit_game.html",
    "revision": "530e904f14afe890232c798e00613943"
  },
  {
    "url": "edit_player_stats.html",
    "revision": "758d01bb055951ab3dffb7c7a074b3a0"
  },
  {
    "url": "edit_player.html",
    "revision": "eed263c224ba6ac7d17d6ee7dc407a3e"
  },
  {
    "url": "game.html",
    "revision": "224f9063a5447db221933ec050aba8d0"
  },
  {
    "url": "home.html",
    "revision": "061a514da370e53ba3d13f6f490f820c"
  },
  {
    "url": "img/cat.jpg",
    "revision": "1ef4fba8905bdd926e92f028e07d5717"
  },
  {
    "url": "img/edit.png",
    "revision": "f997a8e1cb705be2571fa7533f3627b7"
  },
  {
    "url": "img/logout.ico",
    "revision": "a9b4538fb971ec0134344041b6aeb111"
  },
  {
    "url": "img/soccer_icon.png",
    "revision": "5775093ef7e3b94dbd626927910f2409"
  },
  {
    "url": "img/soccer_img.png",
    "revision": "b1cb1407c84a320ed9984921ce1274dd"
  },
  {
    "url": "img/team_logo.jpg",
    "revision": "8a7598f8a442655d227d7a06af1cb594"
  },
  {
    "url": "img/trash.png",
    "revision": "f82fcbb5066f92b1d8411943dd8c125d"
  },
  {
    "url": "index.html",
    "revision": "bb009391d1dc604420a3b0d2c7eff3e0"
  },
  {
    "url": "main.css",
    "revision": "af8c25ece17e8705c2c65126a6ef4c80"
  },
  {
    "url": "main.js",
    "revision": "dba2c8cd344c2053b23294462a38c1f7"
  },
]

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
