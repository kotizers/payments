Template._paymentStatus.onCreated(function(){
    this.subscribe('payments');
});

Template._paymentStatus.helpers({
    Payments(){
        if(Template.instance().subscriptionsReady()){
            return Payments.find();
        }
        else{
            return Payments;
        }
    },
    PaymentErrors(){
        if(Template.instance().subscriptionsReady()){
            return PaymentErrors.find();
        }
        else{
            return PaymentErrors;
        }
    }
})