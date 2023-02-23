import Base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';

const textReverser = ({ text }) => {
    return text.split("").reverse().join("")
}

export const encrypt = ({ text }) => {
    const reverseText = textReverser({ text })
    const utf8Text = utf8.parse(reverseText)
    const encryptedText = Base64.stringify(utf8Text)
    return encryptedText
}

export const decrypt = ({ text }) => {
    const base64Text = Base64.parse(text)
    const decryptedPhrase = utf8.stringify(base64Text)
    const normalizedText = textReverser({ text: decryptedPhrase })
    return normalizedText
}