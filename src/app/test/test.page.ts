import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Subscription, interval } from 'rxjs';
import { DataService } from '../services/data.service';
import { UsersService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  
  questions: any;
  currentQuestionIndex = 0;
  currentQuestion;
  selectedChoice: string = '';
  showResults = false;
  testSubmitted = false;
  results: any[] = [];
  testResults: any = { time: '', marks: '', results: [] };

  totalTime: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  timerSubscription: Subscription;
  questionData: any;
  isLoading:boolean = false;

  constructor(private route: ActivatedRoute,public dataService: DataService,
    private usersService: UsersService,
    public toast: ToastService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getQuestions();
  }

  ionViewWillEnter() {
    this.getQuestions();
  }

  getQuestions() {
    this.showResults = false;
    this.testSubmitted = false;
    this.currentQuestionIndex = 0;
    this.questions = [];
    this.route.paramMap.subscribe(params => {
      this.questionData = history.state.testData;
      if (history.state?.testResult) {
        this.showResults = true;
        this.testSubmitted = true;
        this.results = history.state?.testResult;
      }
      if (this.questionData.category == 'achievement') {
        setTimeout(() => {
          this.getAchievementTestData();
        }, 0);
      } else {
        setTimeout(() => {
          this.getPracticeTesttData();
        }, 0);
      }
      this.totalTime = 3600;
      if (this.showResults == false && this.questionData.category == 'achievement') {
        this.startTimer();
      }
    });
  }

  getPracticeTesttData() {
    this.isLoading = true;
    this.dataService
      .getPracticeTesttData().subscribe((data) => {
        this.questions = data;
        this.shuffleArray(this.questions);
        this.currentQuestion = this.questions[0];
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }, err => {
        console.log(err);
        this.isLoading = false;
      });
  }

  getAchievementTestData() {
    this.isLoading = true;
    this.dataService
      .getAchievementTestData().subscribe((data) => {
        this.questions = data;
        this.shuffleArray(this.questions);
        this.currentQuestion = this.questions[0];
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }, err => {
        console.log(err);
        this.isLoading = false;
      });
  }

  startTimer() {
    this.stopTimer();
    this.timerSubscription = interval(1000).subscribe(() => {
     if(this.router.url.split('/').pop() == 'test')
     {
      this.totalTime--;
      this.minutes = Math.floor(this.totalTime / 60);
      this.seconds = this.totalTime % 60;
      if (this.totalTime <= 0) {
        this.timerSubscription.unsubscribe();
        this.submitAnswer('submit');
      }
     } else {
      this.stopTimer();
     } 
    });
  }

  submitAnswer(from) {
    if (this.selectedChoice != '') {
      const result = {
        id: this.currentQuestion.id,
        question: this.currentQuestion.question,
        selectedChoice: this.selectedChoice,
        correctChoice: this.currentQuestion.correctChoice ||  this.currentQuestion.correct_choice,
        isAnsCorrect: this.selectedChoice == this.currentQuestion.correctChoice ||  this.currentQuestion.correct_choice
      };
      console.log("result",result);
      // Update the answer if it already exists, otherwise push it to the results array
      const existingResultIndex = this.results.findIndex(r => r.question === this.currentQuestion.question);
      console.log("existingResultIndex",existingResultIndex);
      if (existingResultIndex > -1) {
        this.results[existingResultIndex] = result;
      } else {
        this.results.push(result);
      }

      console.log(" this.results", this.results);
      this.selectedChoice = '';
      this.currentQuestionIndex++;
  
      if (this.currentQuestionIndex < this.questions.length) {
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        // Check if there's already an answer for this question
        const existingAnswer = this.results.find(r => r.question === this.currentQuestion.question);
        console.log("existingAnswer",existingAnswer)
        if (existingAnswer) {
          this.selectedChoice = existingAnswer.selectedChoice;
        }
      } else {
        this.showResults = true;
        this.testSubmitted = true;
        if (this.questionData.category == 'achievement') {
          this.updateTestResults();
          this.timerSubscription.unsubscribe();
          this.submitAnswers();
        }
        this.scrollToTop();
      }
    }
    if (from == 'submit') {
      this.showResults = true;
      this.testSubmitted = true;
      this.updateTestResults();
      this.timerSubscription.unsubscribe();
      this.scrollToTop();
      if (this.questionData.category == 'achievement') {
        this.submitAnswers();
      }
    }
  }

  updateTestResults() {
    this.testResults['time'] = this.calculateTotalTimeTaken();
    this.testResults['marks'] = this.getCorrectAnswerNumber();
    this.testResults['results'] = this.results;
  }

  submitAnswers() {
    let uid = localStorage.getItem('uid');
    let idToken = localStorage.getItem('idToken');
    this.usersService.getUserDetails(uid,idToken)
      .subscribe((user: any) => {
        user.achievementTestResult = this.testResults;
        this.usersService
        .updateUserDetails(uid,idToken,user)
        .subscribe(res => {
          this.toast.sucessToast('Test Submitted successfully');
          this.testSubmitted = true;
        }, err => {
          this.toast.sucessToast('Test Submitted failed');
          this.testSubmitted = true;
        });
        this.isLoading = false;
      }, err => {
        console.log(err);
      });
  }

  calculateTotalTimeTaken(): string {
    const totalSeconds = 3600 - (this.minutes * 60 + this.seconds);
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}m`;
}

  goToPreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      const existingAnswer = this.results.find(r => r.question === this.currentQuestion.question);
      if (existingAnswer) {
        this.selectedChoice = existingAnswer.selectedChoice;
      } else {
        this.selectedChoice = '';
      }
    }
  }

  buttonText() {
    return this.currentQuestionIndex + 1 == this.questions.length ? 'Submit' : 'Next Question';
  }

  optionSelected(option) {
    this.selectedChoice = option;
  }

  getCorrectAnswerNumber() {
    return this.results.filter(qn => qn.isAnsCorrect).length;
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ionViewWillLeave() {
    this.stopTimer();
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

