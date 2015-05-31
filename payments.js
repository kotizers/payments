Payments = new Mongo.Collection('payments');
PaymentErrors = new Mongo.Collection('payment_errors');

// TODO: Write schema using collection2

if (Meteor.isServer) {
    var payments, product = {};

    function paymentId(){
        return Random.id(25);
    }

    // Borrowed from Tomasz Nurkiewicz on SO
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    product.id = function(){
        return Random.choice(['basic-f', 'basic-m', 'platinum-m']);
    };

    product.name = function(){
        return Random.choice(['Paket “Basic”', 'Paket “Platinum”']);
    };

    product.price = function(){
        return Random.choice([69.00, 39.00, 89.00]);
    };

    product.state = function(){
        return Random.choice(['created', 'approved']);
    }

    payments = function(){
        return {
            provider: 'paypal',
            userId: Random.id(),
            productId: product.id(),
            productName: product.name(),
            amount: product.price(),
            paymentId: paymentId(),
            state: product.state(),
            createdAt: randomDate(new Date(2015, 0, 1), new Date())
        };
    };

    // Comment out when adding to a180
    // Meteor.startup(function(){
    //     if(Payments.find().count() !== 0){ return; }
    //     Meteor.defer(function(){
    //         for(var i = 1; i <= 20; i++){
    //             console.log( Payments.insert(payments()) );
    //         }
    //     });
    // });
    
    function isAdmin(_meteor){
        var user = Meteor.users.findOne(_meteor.userId, { fields: { admin: 1 } });

        if(user && user.admin)
            return true;
        else
            return false;
    }

    Meteor.startup(function(){
        Payments._ensureIndex({provider: 1, paymentId: 1}, {unique: 1});
    });

    // TODO: Make a separate publications for PaymentErrors
    Meteor.publish('payments', function(){
        // if(isAdmin(this))
            return [Payments.find(), PaymentErrors.find()];
        // else
        //     return [];
    });
}