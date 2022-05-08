pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/comparators.circom";
include "../../node_modules/circomlib-matrix/circuits/matMul.circom"; // hint: you can use more than one templates in circomlib-matrix to help you
include "../../node_modules/circomlib-matrix/circuits/matSub.circom";

template SystemOfEquations(n) { // n is the number of variables in the system of equations
    signal input x[n]; // this is the solution to the system of equations
    signal input A[n][n]; // this is the coefficient matrix
    signal input b[n]; // this are the constants in the system of equations
    signal output out; // 1 for correct solution, 0 for incorrect solution

    // [bonus] insert your code here
    component multi = matMul(n, n, 1);

    for(var i = 0; i < n; i++) {
        for(var j = 0; j < n; j++) {
            multi.a[i][j] <== A[i][j];
        } 
    }

    for(var i = 0; i < n; i++) {
        // log(x[i]);
        multi.b[i][0] <== x[i];
    }

    component sub = matSub(n, 1);
    
    for(var i = 0; i < n; i++) {
        // log(multi.out[i][0]);
        sub.a[i][0] <== multi.out[i][0];
        sub.b[i][0] <== b[i];
    }

    for(var i = 0; i < n; i++) {
        assert(sub.out[i][0] == 0); 
    }

    out <== 1;    
}

component main {public [A, b]} = SystemOfEquations(3);