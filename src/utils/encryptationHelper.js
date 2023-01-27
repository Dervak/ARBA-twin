import aes from 'crypto-js/aes';
import Base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';
export const encrypt = ({ text }) => {
    const reverseText = text.split("").reverse().join("")
    const utf8Text = utf8.parse(reverseText)
    const keyPhrase = Base64.stringify(utf8Text)
    const base64Text = Base64.parse(keyPhrase)
    const decryptedPhrase = utf8.stringify(base64Text)
    const normalText = decryptedPhrase.split("").reverse().join("")
}