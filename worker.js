const { parentPort, workerData } = require('worker_threads');
let thisArmy = workerData;

parentPort.on('message', message => {
    try {
        commands[message.commandName](message.commandParams);
    } catch (err) {
        console.log(`Failed to perform command ${message.commandName} for ${army.name}`);
    }
    
});

const commands = {};

commands.takeTurn = function(armies) {
    // TODO reload
    const target = selectTarget(armies);
    let msg = `${thisArmy.name} targets ${target.name}`;

    if (isSuccessfulHit()) {
        const damage = calculateDamage();
        console.log(`NOTE: --- Registering ${damage} damage to ${target.name} in DB...`);
        msg += ` and lands a successful hit, dealing ${damage} damage!`;
    } else {
        msg += ' but fails to land a hit!';
    }
    
    console.log(msg);
};

const selectTarget = function(armies) {
    // TODO logic
    return armies[armies.length - 1];
}

const isSuccessfulHit = function() {
    return thisArmy.name !== 'Isengard';
}

const calculateDamage = function() {
    // TODO logic
    return 5;
}
