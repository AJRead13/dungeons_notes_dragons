const generateScore = () => {
  let a1 = Math.floor(Math.random() * 6 + 1);
  let a2 = Math.floor(Math.random() * 6 + 1);
  let a3 = Math.floor(Math.random() * 6 + 1);
  let a4 = Math.floor(Math.random() * 6 + 1);

  let rollArray = [a1, a2, a3, a4];

  let abilityScore = rollArray.filter((roll) => roll > Math.min(...rollArray));
  while (abilityScore.length < 3) {
    abilityScore.push(Math.min(...rollArray));
  }

  let score = 0;
  let finalScore = abilityScore.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    score
  );
  return finalScore;
}


//below is hitpoint rolls for leveling up

const d6HP = () => {
  let d6 = Math.floor((Math.random() * 6) + 1);
  return d6;
}

const d8HP = () => {
  let d8 = Math.floor((Math.random() * 8) + 1);
  return d8;
}

const d10HP = () => {
    let d10 = Math.floor((Math.random() * 10) +1 )
    return d10;
}

const d12HP = () => {
    let d12 = Math.floor((Math.random() * 12) +1 )
    return d12;
}

// function meleeAttack() {
//     let attackMelee = Math.floor((Math.random() * 20) + 1 (`${Character.strength + Character.proficiency}`))
//     return attackMelee;
// }

// function rangedAttack() {
//     let attackRange = Math.floor((Math.random() * 20) + 1 (`${Character.dexterity + Character.proficiency}`))
//     return attackRange;
// }

// function spellAttack() {
//     let attackSpell = Math.floor((Math.random() * 20) + 1 + (`${Character.intelligence || Character.charisma || Character.wisdom + Character.proficiency}`))
//     return attackSpell;
// }

// function abilitySave() {
//     let saveScore = Math.floor((Math.random() * 20) + 1 + (`${Character.strength || Character.dexterity || Character.constitution || Character.intelligence || Character.wisdom || Character.charisma}`))
//     return saveScore;
// }

// function skillCheck() {
//     let skillRoll = Math.floor((Math.random() * 20) + 1 + (`${Character.strength || Character.dexterity || Character.constitution || Character.intelligence || Character.wisdom || Character.charisma}`) + (Character.proficiency))
//     return skillRoll;

// }

// function weaponDamage() {
//     let damageRoll = Math.floor((Math.random() * `${weapon.damage.damage_dice.split("d")}`) + 1)
//     return damageRoll;
// }

const getModifier = () => {
  let strScore = document.getElementById("strScore").value;
  document.getElementById("strMod").value = Math.floor((strScore - 10)/2);
  let dexScore = document.getElementById("dexScore").value;
  document.getElementById("dexMod").value = Math.floor((dexScore - 10)/2);
  let conScore = document.getElementById("conScore").value;
  document.getElementById("conMod").value = Math.floor((conScore - 10)/2);
  let intScore = document.getElementById("intScore").value;
  document.getElementById("intMod").value = Math.floor((intScore - 10)/2);
  let wisScore = document.getElementById("wisScore").value;
  document.getElementById("wisMod").value = Math.floor((wisScore - 10)/2);
  let chaScore = document.getElementById("chaScore").value;
  document.getElementById("chaMod").value = Math.floor((chaScore - 10)/2);
}



// export default  { generateScore, d6HP, d8HP, d10HP, d12HP, getHPTotal, getModifier };
