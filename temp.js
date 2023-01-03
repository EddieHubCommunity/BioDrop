import fs from 'fs'


 

const filenames = fs.readdirSync('data')

var file =[]

var github_profile="https://github.com/${username}.png"

filenames.map((jsonFileName) => {
    file.push(`${jsonFileName}`)   
})

async function aap() {
    for (let i = 0; i < file.length; i++) {
        if(!fs.lstatSync(`data/${file[i]}`).isDirectory()){
        var mydata=JSON.parse(await fs.readFileSync(`data/${file[i]}`))
        mydata.avatar=github_profile
        await fs.writeFileSync(`data/${file[i]}`,JSON.stringify(mydata))
    }
        console.log(file[i]);
    } 
}


aap()

