var Bees = ( function () {

    // module settings
    var settings = {
      
    };

    // One array to bind them
    var bees = [];

    // Bee constructor
    var Bee = function (stats) {
        this.name = stats.name;
        this.type = stats.type;
        this.status = 'alive';

        switch ( stats.type ) {
            case 'drone' :
                this.health = 50;
                break;
            case 'worker' :
                this.health = 75;
                break;
            case 'queen' :
                this.health = 100;
                break;
            default :
                console.error('Please enter a type for the bee named: ' + this.name);
        }

    };

    // define bees
    var setBees = function () {

        // Seven Drones
        bees.push(new Bee({
            name: 'Eric',
            type: 'drone'
        }));
        bees.push(new Bee({
            name: 'Tom',
            type: 'drone'
        }));
        bees.push(new Bee({
            name: 'Matt',
            type: 'drone'
        }));
        bees.push(new Bee({
            name: 'Anna',
            type: 'drone'
        }));
        bees.push(new Bee({
            name: 'Lassie',
            type: 'drone'
        }));
        bees.push(new Bee({
            name: 'Milky',
            type: 'drone'
        }));
        bees.push(new Bee({
            name: 'Stinger',
            type: 'drone'
        }));

        // Five Workers
        bees.push(new Bee({
            name: 'Danny',
            type: 'worker'
        }));
        bees.push(new Bee({
            name: 'Malissa',
            type: 'worker'
        }));
        bees.push(new Bee({
            name: 'Dan',
            type: 'worker'
        }));
        bees.push(new Bee({
            name: 'Valerie',
            type: 'worker'
        }));
        bees.push(new Bee({
            name: 'Charlie',
            type: 'worker'
        }));

        // Three Queens
        bees.push(new Bee({
            name: 'Patricia',
            type: 'queen'
        }));
        bees.push(new Bee({
            name: 'Hilda',
            type: 'queen'
        }));
        bees.push(new Bee({
            name: 'Florence',
            type: 'queen'
        }));

    };

    // Check if bees are alive
    var checkBeeHealth = function () {

        var deadBeeCount = 0;

        // loop through the bees
        bees.forEach( function ( bee ){

            // check the bees health
            if ( bee.health <= 0 ) {

                // If the bee is dead, update its status to dead.
                bee.status = 'dead';

                deadBeeCount++;

            }

        });

        if ( deadBeeCount > bees.length ) {
            updateDisplay.clearBee();
            updateDisplay.victoryMessage();
        }

    };

    // Damage the bee
    var beeHitter = function (beeIndex) {

        // Loop through all of the bees
        bees.forEach( function ( bee, i ) {

            // Get the bee index and if the bee has the same index and the passed index, hit it
            if ( beeIndex == i ) {

                // Remove health from the bee, depending on type
                switch ( bee.type ) {
                    case 'drone' :
                        bee.health = bee.health - 18;
                        break;
                    case 'worker' :
                        bee.health = bee.health - 12;
                        break;
                    case 'queen' :
                        bee.health = bee.health - 7;
                        break;
                    default :
                        console.error( 'Type not defined for bee: ' + bee.name )
                }

            }

        });

        updater();
        updateDisplay.displayBee( beeIndex );

    };

    // Check queen bees
    var checkQueensAreAlive = function () {

        var noOfQueens = 0;
        var noOfDeadQueens = 0;

        // loop through the bees
        bees.forEach( function ( bee ){

            // check the bees health
            if ( bee.type == 'queen' ) {

                noOfQueens ++ ;

                if ( bee.status == 'dead' ) {
                    noOfDeadQueens ++ ;
                }

            }

        });


        if ( noOfQueens == noOfDeadQueens ) {
            return true;
        } else {
            return false;
        }
    };

    // Every time something is changed, this function is run
    var updater = function () {

        // Check the bees health
        checkBeeHealth();
        if ( checkQueensAreAlive() ) {
            killAllBees();
        }

    };

    var resetListener = function () {
        document.querySelector('.reset').addEventListener('click', reset);
    };

    // Reset function, resets everything back to the default
    var reset = function () {
        updateDisplay.resetMessage();
        updateDisplay.clearBee();
        bees.forEach( function (bee) {
            bee.status = 'alive';
            switch ( bee.type ) {
                case 'drone' :
                    bee.health = 50;
                    break;
                case 'worker' :
                    bee.health = 75;
                    break;
                case 'queen' :
                    bee.health = 100;
                    break;
            }
        });
    };

    var killAllBees = function () {
        bees.forEach( function (bee) {
            bee.health = 0;
            bee.status = 'dead';
        });
        updateDisplay.clearBee();
        updateDisplay.victoryMessage();
    };

    // The init function
    var init = function () {
        setBees();
        resetListener();
    };


    // Return an object with all of the public interfaces
    return {
        init: init,
        bees: bees,
        beeHitter: function (beeIndex) {
            beeHitter(beeIndex);
        },
        reset: reset,
        killAllBees: killAllBees
    }


}) ();



// when the wacker selects a be, it will first check to see of one of the three arrays contain anything,
// then it will pick one randomly, then it will pick one of the bees within that array.
var wacker = ( function () {

    // Random bee selector
    var randomBee = function () {

        // Create a random number
        var selectRandomBee = function () {

            // Get the number
            return Math.floor( Math.random() * Bees.bees.length );

        };

        var isBeeAlive = false;

        var theRandomBee = selectRandomBee();

        var emergencyExit = 0;

        while (emergencyExit<1000)  {
            if ( Bees.bees[theRandomBee].status == 'alive' ) {
                return theRandomBee;
            } else {
                theRandomBee = selectRandomBee();
            }
            emergencyExit++;
        }

        if (emergencyExit >= Bees.bees.length) {
            updateDisplay.victoryMessage();
        }

    };

    // Hit the bee (accepts random bee)
    var wackABee = function () {
        // document.querySelector('.bee').classList.remove('active');
        Bees.beeHitter(randomBee());
        // document.querySelector('.bee-info').classList.add('active');
    };

    var buttonListener = function () {
        document.querySelector('.wacker').addEventListener( 'click', wackABee );
    };

    var init = function () {
        buttonListener();
    };

    // Return an object with the methods.
    return {
        init: init
    }

}) () ;

var updateDisplay = ( function () {

    // Get the container for the bee information
    var messageText = document.querySelector('.message-text');
    var beeInfo = document.querySelector('.bee-info');
    // var beeClass = document.querySelector('.bee');

    // get the bee that has been passed through and display its stats
    var beeHTML = function ( bee ) {
        var html =  '<div class="bee">';
            html +=     '<img class="bee-image" src="assets/images/bee.png"/>';
            html +=     '<h2>' + bee.name + '</h2>';
            html +=     '<h3>' + bee.health + '</h3>';
            html +=     '<h3>' + bee.status + '</h3>';
            html +=     '<h3>' + bee.type + '</h3>';
            html += '</div>';
        return html;
    };

    var clearBee = function () {
        beeInfo.innerHTML = '';
    };

    var displayBee = function ( beeIndex ) {

        Bees.bees.forEach( function( bee, i ) {
            if ( beeIndex == i ) {
                beeInfo.innerHTML = beeHTML(bee);
            }
        });
        beeInfo.classList.add('active');

    };

    var displayVictoryMessage = function () {
        messageText.innerHTML = '<h1>Victory! All the bees are dead</h1>'
    };

    var displayIntroMessage = function () {
        messageText.innerHTML = '<h1>Welcome to the Bee Wacker!</h1>' +
            '<p>To start wacking bees, hit \'Wack a bee\'.</p>';
    };

    var displayResetMessage = function () {
        messageText.innerHTML = '<h1>The bees have been reset!</h1>';
    };

    var init = function () {
        displayIntroMessage();
    };

    return {
        displayBee: function ( bee ) {
            displayBee( bee );
        },
        victoryMessage: displayVictoryMessage,
        resetMessage: displayResetMessage,
        clearBee: clearBee,
        init: init
    }

}) ();

Bees.init();
wacker.init();
updateDisplay.init();
// updateDisplay.init();
