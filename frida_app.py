import sys
import frida
from frida.core import Device, Session, Script

script_text = """
    Java.perform(() => {
        const TextView = Java.use("android.widget.TextView");
        TextView.setText.overload("java.lang.CharSequence").implementation = function (x) {
            const stringToSend = x.toString();
            send(stringToSend);
            let string = "";
            recv('setText', (data)=>{
                string = data.payload;
            }).wait();
            return this.setText(Java.use("java.lang.String").$new(string));
        }
    });
"""


device: Device = frida.get_usb_device()
pid = device.spawn(["com.andromeda.hackme"])

session: Session = device.attach(pid)
script: Script = session.create_script(script_text)


def callback(message, data):
    script.post({'type': 'setText', 'payload': "degistir!"})

script.on("message", callback)
script.load()
device.resume(pid)
sys.stdin.read()