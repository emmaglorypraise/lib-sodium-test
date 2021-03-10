
let text = document.getElementById('text');
let password = document.getElementById('password');
let getPassword = password.value;
// console.log("text:", text);

const sodium = require('sodium-javascript')

const key = Buffer.alloc(sodium.crypto_secretbox_KEYBYTES)
const nonce = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES)

sodium.randombytes_buf(key)
sodium.randombytes_buf(nonce)


let button = document.getElementById('getPassword');
button.addEventListener("click", function(event){
    event.preventDefault();
    let getPassword = password.value;
    if (getPassword == " "){
        console.log("Nothing")
    } else {
 
     let message = Buffer.from(getPassword)
     const cipher = Buffer.alloc(message.length + sodium.crypto_secretbox_MACBYTES)

     // Encrypt:
     sodium.crypto_secretbox_easy(cipher, message, nonce, key)

     console.log('Encrypted:', cipher)

     // Decrypt
     const plainText = Buffer.alloc(cipher.length - sodium.crypto_secretbox_MACBYTES)

     sodium.crypto_secretbox_open_easy(plainText, cipher, nonce, key)

     console.log('Decrypted:', plainText.toString())
    }
})
