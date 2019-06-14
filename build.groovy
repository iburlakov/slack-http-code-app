pipeline {
    agent {
        label 'test'
    }

    parameters {
        choice(name: "options", description: "options info" choices: 'opt1\nopt2\nopt3')
        string(name: "str1", defaultvalue: "string 1", description: "string 1 info")
    }

    stages {
        stage("stage 1") {
            steps {
                script {
                    echo "1";
                }
            }
        }
    }
}


// println "hello"
// println 1 + 2

// try 
// { 
//     def sParameterLessClosure = "1 + 2 == ${-> 3}" 
//     assert sParameterLessClosure != '1 + 2 == 3' : "some went wrong"
// }
// catch (AssertionError e)
// {
//     println e.getMessage()
// }