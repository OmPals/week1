const fs = require("fs");
const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

const verifierRegex = /contract Verifier/

let content = fs.readFileSync("./contracts/HelloWorldVerifier.sol", { encoding: 'utf-8' });
let bumped = content.replace(solidityRegex, 'pragma solidity ^0.8.0');
bumped = bumped.replace(verifierRegex, 'contract HelloWorldVerifier');

fs.writeFileSync("./contracts/HelloWorldVerifier.sol", bumped);

// [assignment] add your own scripts below to modify the other verifier contracts you will build during the assignment

// For Multiplier3Verifier 
let content_Multiplier3 = fs.readFileSync("./contracts/Multiplier3Verifier.sol", { encoding: 'utf-8' });
let bumped_Multiplier3 = content_Multiplier3.replace(solidityRegex, 'pragma solidity ^0.8.0');
bumped_Multiplier3 = bumped_Multiplier3.replace(verifierRegex, 'contract Multiplier3Verifier');

fs.writeFileSync("./contracts/Multiplier3Verifier.sol", bumped_Multiplier3);
console.log("Bumped Multiplier3 Successfully!");

// For PlonkVerifier of Multiplier3
let content_Multiplier3_plonk = fs.readFileSync("./contracts/Multiplier3Verifier_plonk.sol", { encoding: 'utf-8' });
let bumped_Multiplier3_plonk = content_Multiplier3_plonk.replace(solidityRegex, 'pragma solidity ^0.8.0');

fs.writeFileSync("./contracts/Multiplier3Verifier_plonk.sol", bumped_Multiplier3_plonk);
console.log("Bumped Multiplier3_plonk Successfully!");
