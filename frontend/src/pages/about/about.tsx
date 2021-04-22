import { Container, Typography } from "@material-ui/core";
import React from "react";
import CustomDivider from "../../components/CustomDivider";
import ProjectLogo from "../../components/logo/logo";

const About = () => {
  return (
    <Container>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <ProjectLogo />
      </div>

      <Typography variant="h4" gutterBottom>
        About the Project
      </Typography>

      <CustomDivider />

      <Typography>
        Plagiarism has been increasing in the student assignment submissions
        which affects the evaluation of students. This paper proposes an
        approach for plagiarism detection in electronic texts as well as
        programming assignments. For electronics text, most of the methods take
        only syntactic similarity into consideration. We propose a framework
        based on BERT which is able to detect semantic similarity. Our method
        outperforms the best performing method at PAN competition 2014 in
        detecting verbatim and summary plagiarism. In case of programming
        assignments, we propose a machine learning approach for plagiarism
        detection. Different features related to source code are computed based
        on similarity score of n-grams, code style similarity and dead codes.
        Then, xgboost model is used for training and predicting whether a pair
        of source code are plagiarised or not. Many plagiarism techniques
        ignores dead codes such as unused variables and functions in their
        predictions tasks. But number of unused variables and functions in the
        source code are considered in this paper. Using our features, the model
        achieved an accuracy score of 94\% and average f1-score of 0.905 on the
        test set. We also compared the result of xgboost model with support
        vector machines(SVM) and report that xgboost model performed better on
        our dataset.
      </Typography>

      <CustomDivider />

      <Typography variant="h4" gutterBottom>
        Introduction
      </Typography>

      <CustomDivider />

      <Typography>
        With the increase in digital content because of the Internet,
        information has been easily available for everyone. The sharing of
        assignments, whether text based or programming assignments, has been
        easy for students. Due to this, plagiarism has been increasing in the
        academic sector. Plagiarism will not result in the fair evaluation of
        the students as well as it hampers the learning of the student. The
        manual checking for plagiarism in assignments is tedious and time
        consuming. Many tools have been made for checking plagiarism in
        electronic texts assignments. Most of the methods only checks for
        syntactic similarity in the documents. They do not take the semantic
        meaning of the sentences into consideration. Keeping this in mind, we
        have made an effort for plagiarism detection in text assignments based
        on semantic similarity. Many tools have been made for checking
        plagiarism in programming assignments. The plagiarism detection task can
        be considered as a classification problem. The two assignments can be
        taken as inputs and the system will determine if the pair of assignments
        are plagiarised or not. Early methods for plagiarism detection in
        programming assignments are based on n-gram techniques and create
        fingerprints of the assignments to measure similarity between them. They
        do not take code style similarity such as braces, comments and
        whitespace similarity into consideration. Our approach computes
        different features from the programming assignments that are helpful for
        detecting plagiarism such as similarity score, number of unused
        variables and functions, etc from the source code. Then, we train an
        xgboost learning algorithm on these features.
      </Typography>

      <CustomDivider />

      <Typography variant="h4" gutterBottom>
        Background
      </Typography>

      <CustomDivider />

      <Typography>
        As it is becoming easier for learners to be at any part of the globe and
        get affiliation to a university’s degree, it is getting much more
        difficult for universities to actually validate students on the basis of
        legitimacy of the course offered by the university. Students are often
        found to be submitting somebody else’s work in the form of assignments,
        or source code, even masquerading in the final exams that can easily be
        performed but very hard to get detected in this age of online
        learning.So, to address this global issue to some extent and make
        country like Nepal emerge in the e-learning process, we have made an
        effort on plagiarism detection of assignments and source code
        submission.
      </Typography>
    </Container>
  );
};
export default About;
