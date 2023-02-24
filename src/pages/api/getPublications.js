import SSH2Promise from "ssh2-promise"
import apiAuth from "@/utils/apiAuth"
import fs from 'fs-extra'

const SSHConfig = {
    host: "hitman.arba.gov.ar",
    username: process.env.SSH_USER,
    password: process.env.SSH_PASS
}

const ssh = new SSH2Promise(SSHConfig)

const getPublications = apiAuth(async (req, res) => {
    const { initialDate, finishDate, publisherSystem } = req.body
    ssh.connect()
        .then(() => {
            console.log("Connection established")
        })
        .then(async () => {
            const publicationIds = await execScript({ initialDate: "20230101", finishDate: "20230131", publisherSystem: "218" })
            console.log(publicationIds)
        })
        .then(() => {
            closeConnection()
        })
})

const execScript = async ({ initialDate, finishDate, publisherSystem }) => {
    const script = `bash Scripts/SV013_V07_2.sh ${initialDate} ${finishDate} ${publisherSystem} 100 https://app.arba.gov.ar/`
    const scriptRes = await ssh.exec(script)
    console.log(scriptRes)
    // const publicationIds = new Promise(async (resolve, reject) => {
    //     const scriptSocket = await ssh.exec(script)
    //     scriptSocket.on("data", async (data) => {
    //         const scriptData = await JSON.parse(data.toString())
    //         const publicationIds = await scriptData.items.comunicacionSimplificada.map(item => {
    //             return item.idComunicacion
    //         })
    //         resolve(publicationIds)
    //     })
    // })
    return scriptRes
}

const closeConnection = () => {
    ssh.close().then(() => {
        console.log("Connection closed")
    })
}

export default getPublications