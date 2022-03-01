


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

export default getModifier;