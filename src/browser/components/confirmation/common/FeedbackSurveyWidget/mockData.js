const surveyQuestionList = [
  {
    id: 92,
    surveyId: 2,
    question: 'Please select the reason for your rating:',
    questionType: 'MULTI_SELECT',
    surveyOptionList: [
      {
        id: 359,
        optionValue: 'Delivery Options/Details',
        questionId: 92
      },
      {
        id: 360,
        optionValue: 'Payment Experience',
        questionId: 92
      },
      {
        id: 361,
        optionValue: 'Pricing & Offers',
        questionId: 92
      },
      {
        id: 362,
        optionValue: 'Product Description/Images',
        questionId: 92
      },
      {
        id: 363,
        optionValue: 'Product Variety & Range',
        questionId: 92
      },
      {
        id: 364,
        optionValue: 'Search & Filter Options',
        questionId: 92
      }
    ],
    multiSelect: true
  },
  {
    id: 10,
    surveyId: 2,
    question:
      'We appreciate your feedback. Please share any additional details that could help us improve',
    questionType: 'TEXT',
    surveyOptionList: [
      {
        id: 30,
        optionValue: '',
        questionId: 10
      }
    ],
    text: true
  }
];

export default {
  data: {
    bountyOrder: {
      storeOrderId: 117571295852327090902
    },
    feedbackSurvey: {
      id: 530518,
      authenticationKey: '46c8c9b8-b366-47cc-9257-e0e1be4cd7e7',
      list: {
        question:
          'Based on your experience on the Myntra Platform, how likely are you to recommend Myntra to your friends and family?',
        surveyOptionList: [
          {
            id: 10,
            optionValue: '1',
            questionId: 4,
            surveyQuestionList
          },
          {
            id: 11,
            optionValue: '2',
            questionId: 4,
            surveyQuestionList
          },
          {
            id: 12,
            optionValue: '3',
            questionId: 4,
            surveyQuestionList
          },
          {
            id: 13,
            optionValue: '4',
            questionId: 4,
            surveyQuestionList
          },
          {
            id: 14,
            optionValue: '5',
            questionId: 4,
            surveyQuestionList
          }
        ],
        nps: true
      }
    }
  }
};
