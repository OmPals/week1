const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = ethers.utils
const fs = require("fs");
const { groth16, plonk } = require("snarkjs");

function unstringifyBigInts(o) {
    if ((typeof(o) == "string") && (/^[0-9]+$/.test(o) ))  {
        return BigInt(o);
    } else if ((typeof(o) == "string") && (/^0x[0-9a-fA-F]+$/.test(o) ))  {
        return BigInt(o);
    } else if (Array.isArray(o)) {
        return o.map(unstringifyBigInts);
    } else if (typeof o == "object") {
        if (o===null) return null;
        const res = {};
        const keys = Object.keys(o);
        keys.forEach( (k) => {
            res[k] = unstringifyBigInts(o[k]);
        });
        return res;
    } else {
        return o;
    }
}

describe("RangeProof with Groth16", function () {

    beforeEach(async function () {
        //[assignment] insert your script here

        Verifier = await ethers.getContractFactory("Verifier");
        verifier = await Verifier.deploy();
        await verifier.deployed();
    });

    it("Should return true for correct proof", async function () {
        //[assignment] insert your script here

        const { proof, publicSignals } = await groth16.fullProve({"in":"9","range":["8", "10"]}, 
        "contracts/circuits/RangeProof/RangeProof_js/RangeProof.wasm","contracts/circuits/RangeProof/circuit_final.zkey");

        // prints first public signal to the console
        console.log('9 is between 8 and 10 is: ',publicSignals[0]);

        // Converts appropriate string to BigInt from publicSignals array
        const editedPublicSignals = unstringifyBigInts(publicSignals);
        
        // Converts appropriate string to BigInt from proof object
        const editedProof = unstringifyBigInts(proof);

        // Creates Solidity calldata using editedProof and editedPublicSignals, later be used to pass to the Solidity verifier
        const calldata = await groth16.exportSolidityCallData(editedProof, editedPublicSignals);

        // Converts calldata into argv array
        // Replaces literally "/", one of ""[\", whitespace, literally "]/g" with blank, 
        // splits the calldata with comma
        // each comma separated value will converted from BigInt to string again
        const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());
    
        // Prepare inputs for verifier contract
        const a = [argv[0], argv[1]];
        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
        const c = [argv[6], argv[7]];
        const Input = argv.slice(8);

        // Verify the proof using Smart Contract and expect to be true
        expect(await verifier.verifyProof(a, b, c, Input)).to.be.true;
    });
    it("Should return true for correct proof", async function () {
        //[assignment] insert your script here

        const { proof, publicSignals } = await groth16.fullProve({"in":"50","range":["8", "10"]}, 
        "contracts/circuits/RangeProof/RangeProof_js/RangeProof.wasm","contracts/circuits/RangeProof/circuit_final.zkey");

        // prints first public signal to the console
        console.log('50 is between 8 and 10 is: ',publicSignals[0]);

        // Converts appropriate string to BigInt from publicSignals array
        const editedPublicSignals = unstringifyBigInts(publicSignals);
        
        // Converts appropriate string to BigInt from proof object
        const editedProof = unstringifyBigInts(proof);

        // Creates Solidity calldata using editedProof and editedPublicSignals, later be used to pass to the Solidity verifier
        const calldata = await groth16.exportSolidityCallData(editedProof, editedPublicSignals);

        // Converts calldata into argv array
        // Replaces literally "/", one of ""[\", whitespace, literally "]/g" with blank, 
        // splits the calldata with comma
        // each comma separated value will converted from BigInt to string again
        const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());
    
        // Prepare inputs for verifier contract
        const a = [argv[0], argv[1]];
        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
        const c = [argv[6], argv[7]];
        const Input = argv.slice(8);

        // Verify the proof using Smart Contract and expect to be true
        expect(await verifier.verifyProof(a, b, c, Input)).to.be.true;
    });
});
