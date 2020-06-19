import products from './products.json'
/** True = 65%, False = 35% */

const chanceOfError = 35/100; // no magic numbers

const rejectByChance = () => {
  return Math.random() <= chanceOfError;
}

/** Get table data */
export const emulateGetRequest = () => new Promise((resolve, reject) => {
  if (rejectByChance()) {
    return reject({
      error: 'Server error'
    })
  }
  const delay = parseInt( Math.random() * 1000 )
  setTimeout(() => { resolve(products) }, delay)
})

/** Emuate delete request */
export const emulateDeleteRequest = () => new Promise((resolve, reject) => {
  if (rejectByChance()) {
    return reject({
      error: 'Server error'
    })
  }
  const delay = parseInt( Math.random() * 1000 )
  setTimeout(() => { resolve({message: 'deleted'}) }, delay)
})