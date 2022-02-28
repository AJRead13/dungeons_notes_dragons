import Character from '../../../server/models/Character';

function generateScore() {
  let a1 = Math.floor(Math.random() * 6 + 1);
  let a2 = Math.floor(Math.random() * 6 + 1);
  let a3 = Math.floor(Math.random() * 6 + 1);
  let a4 = Math.floor(Math.random() * 6 + 1);

  // console.log(a1, a2, a3, a4);

  let rollArray = [a1, a2, a3, a4];

  // console.log(rollArray);

  let abilityScore = rollArray.filter((roll) => roll > Math.min(...rollArray));
  while (abilityScore.length < 3) {
    abilityScore.push(Math.min(...rollArray));
  }

  // console.log(abilityScore);

  let score = 0;
  let finalScore = abilityScore.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    score
  );
  // console.log(finalScore);
  return finalScore;
}
// generateScore();

function getModifier(finalScore) {
  return Math.floor((finalScore - 10) / 2);
}

//below is hitpoint rolls for leveling up

function d6HP() {
  let d6 = Math.floor((Math.random() * 6) + 1);
  return d6;
}

function d8HP() {
  let d8 = Math.floor((Math.random() * 8) + 1);
  return d8;
}

function d10HP() {
    let d10 = Math.floor((Math.random() * 10) +1 )
    return d10;
}

function d12HP() {
    let d12 = Math.floor((Math.random() * 12) +1 )
    return d12;
}

//below are the different attack style rolls

function meleeAttack() {
    let attackMelee = Math.floor((Math.random() * 20) + 1 (`${Character.strength + Character.proficiency}`))
    return attackMelee;
}

function rangedAttack() {
    let attackRange = Math.floor((Math.random() * 20) + 1 (`${Character.dexterity + Character.proficiency}`))
    return attackRange;
}

function spellAttack() {
    let attackSpell = Math.floor((Math.random() * 20) + 1 + (`${Character.intelligence || Character.charisma || Character.wisdom + Character.proficiency}`))
    return attackSpell;
}

//various die rolls for checks and saves

function abilitySave() {
    let saveScore = Math.floor((Math.random() * 20) + 1 + (`${Character.strength || Character.dexterity || Character.constitution || Character.intelligence || Character.wisdom || Character.charisma}`))
    return saveScore;
}

function skillCheck() {
    let skillRoll = Math.floor((Math.random() * 20) + 1 + (`${Character.strength || Character.dexterity || Character.constitution || Character.intelligence || Character.wisdom || Character.charisma}`) + (Character.proficiency))
    return skillRoll;

}

// function weaponDamage() {
//     let damageRoll = Math.floor((Math.random() * `${weapon.damage.damage_dice.split("d")}`) + 1)
//     return damageRoll;
// }




module.exports = { generateScore, getModifier, d6HP, d8HP, d10HP, d12HP, meleeAttack, rangedAttack, spellAttack, abilitySave, skillCheck };
