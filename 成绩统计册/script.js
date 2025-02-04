function getAverage(array) {
    let scores = 0;
    for (let i = 0; i < array.length; i++) {
        scores += array[i];
    }
    return scores / array.length; 
}

function getGrade(score) {
    if (score >= 90 && score <= 100) {
        return "A";
    } else if (score >= 80 && score < 90) {
        return "B";
    } else if (score >= 70 && score < 80) {
        return "C";
    } else if (score >= 60 && score < 70) {
        return "D";
    } else if (score < 60) {
        return "F";
    } else {
        return "Wrong scores";
    }
}

function hasPassingGrade(score) {
    return score >= 60;
}

function studentMsg(totalScores, studentScore) {
    const averageScore = getAverage(totalScores);
    const studentGrade = getGrade(studentScore);
    const passingStatus = hasPassingGrade(studentScore) ? "You passed the course." : "You failed the course.";
    
    return `Class average: ${averageScore}. Your grade: ${studentGrade}. ${passingStatus}`;
}

console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));