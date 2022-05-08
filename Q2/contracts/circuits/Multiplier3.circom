pragma circom 2.0.0;

// [assignment] Modify the circuit below to perform a multiplication of three signals

template Multiplier2 () {  //Define the shape of the circuit

   // Declaration of signals.   
   signal input a;  
   signal input b;  
   signal output c;  

   // Constraints.  
   c <== a * b;  
}

// //This template throws error on contraints generation
// template Multiplier3 () {  

//    // Declaration of signals.  
//    signal input a;  
//    signal input b;
//    signal input c;
//    signal output d;  

//    // Constraints.  
//    d <== a * b * c;  
// }

//This circuit multiplies in1, in2, and in3.
template Multiplier3 () {
   //Declaration of signals and components.
   signal input a;
   signal input b;
   signal input c;
   signal output out;
   component mult1 = Multiplier2();
   component mult2 = Multiplier2();

   //Statements.
   mult1.a <== a;
   mult1.b <== b;
   mult2.a <== mult1.c;
   mult2.b <== c;
   out <== mult2.c;
}

component main = Multiplier3();