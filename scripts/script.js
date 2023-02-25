Java.perform(function () {
function create(className) {
    const I = {};
    I.class = function (properties){
        this.properties = properties;
    };
    I.class.prototype = {
        deneme: function (){
            return Java.use(className).$new(this.properties);
        }
    }
    return I.class;
}

String = create("java.lang.String");
console.log(JSON.stringify(new String("Çoktan manipüle ettim bile :)")));
    const Activity = Java.use('android.app.Activity');
    const TextView = Java.use("android.widget.TextView");
    TextView.setText.overload("java.lang.CharSequence").implementation = function (x) {
        const stringToSend = x.toString();
        if(stringToSend === "Beni hackleyemezsin :)"){
            return this.setText(new String("Çoktan manipüle ettim bile :)").deneme());
        }
        return this.setText(x);
    }

    const MainActivity = Java.use('com.andromeda.hackme.MainActivity');
    const isAdmin = MainActivity.isAdmin;
    isAdmin.implementation = (v) => {
        return Java.use("java.lang.Boolean").$new(true);
    }
});


