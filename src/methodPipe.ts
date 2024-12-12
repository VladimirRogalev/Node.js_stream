import * as fs from 'node:fs';
import compareFiles from "./compareFiles"

function copyPhoto (copiesNum: number, index?: number) {
    index = index ?? 0;
    const photo = fs.createReadStream(`images/labrador-retriever${index}.png`);

    const photoCopy = photo.pipe(fs.createWriteStream(`images/labrador-retriever${index+1}.png`));

    // photoCopy.on('finish', () => (index<copiesNum)&& copyPhoto(copiesNum, index+1));

    photoCopy.on('finish',  ()=> {
      const areEqual = (compareFiles(`images/labrador-retriever${index}.png`, `images/labrador-retriever${index+1}.png`));
        console.log(`Files ${index } and ${index+1} ${areEqual ? 'are equal' : 'are not equal'}`);
        if( index < copiesNum) {
            copyPhoto(copiesNum, index+1)
        }
    })
    }

const readStream = fs.createReadStream('images/labrador-retriever.png');
const writeStream = fs.createWriteStream(`images/labrador-retriever0.png`,);

readStream.pipe(writeStream).on('finish', ()=> {
    copyPhoto(10);
})

