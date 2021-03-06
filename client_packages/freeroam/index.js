// CEF browser.
let menu;
// Configs.
let vehicles     = JSON.parse(require('freeroam/configs/vehicles.json'));
let skins        = JSON.parse(require('freeroam/configs/skins.json')).Skins;
let weapon       = JSON.parse(require('freeroam/configs/weapon.json'));
// Initialization functions.
let vehiclesInit = require('freeroam/menu_initialization/vehicles.js');
let skinsinit    = require('freeroam/menu_initialization/skins.js');
let weaponInit   = require('freeroam/menu_initialization/weapon.js');
let playersInit  = require('freeroam/menu_initialization/players.js')
// Init events.
require('freeroam/events.js')();

// Creating browser.
mp.events.add('guiStarted', () => {
	// Creating CEF browser.
    menu = mp.browsers.new('package://freeroam/index.html');
    // Init menus, when browser ready.
    mp.events.add('browserDomReady', (browser) => {
        if (browser == menu) {
            vehiclesInit(menu, vehicles);
            skinsinit(menu, skins);
            weaponInit(menu, weapon);
            playersInit(menu);

            mp.gui.execute(`window.insertMessageToChat('<div style="background-color: rgba(0, 0, 0, 0.75); font-size: 1.0vw; padding: 6px; color: #ff0000; font-weight: 600;">Press F1 for open freeroam menu.</div>');`);
        }
    });
});

// Add player in the table.
mp.events.add('playerJoinedServer', (id, name) => {
    if (menu)
        menu.execute(`addPlayerInTheTable('${id}', '${name}');`);
});

// Remove player from the table.
mp.events.add('playerLeavedServer', (id, name) => {
    if (menu)
        menu.execute(`removePlayerInTheTable('${id}', '${name}');`);
});