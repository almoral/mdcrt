Services = new Meteor.Collection2('services',{
  schema: {
    category:{
      type: String,
      label: 'Category',
      max: 200
    },
    /*
    subCategory:{
      type: String,
      label: 'subCategory',
      max: 200
    },
    targetedArea:{
      type: String,
      label: 'targetedArea',
      max: 200
    },
    specialty:{
      type: String,
      label: 'specialty',
      max: 200
    },
    */
    title: {
      type: String,
      label: 'Title',
      max: 200
    },
    subTitle: {
      type: String,
      label: 'Sub Title',
      max: 200
    },
    personas: {
      type: String,
      label: 'Persona'
    },
    Description: {
      type: String ,
      label: 'Description'
    },
    address: {
      type: String,
      label: 'Address',
      max: 200
    },
    phoneNumber: {
      type: String,
      label: 'Phone Number',
      max: 200
    },
    website: {
      type: String,
      label: 'Website',
      max: 200
    },
    contactPerson: {
      type: String,
      label: 'Contact Person',
      max: 200
    },
    active:{
      type: Boolean
    }
  }
});

if(Meteor.isServer){

Services.allow({
  insert: function(){return true;},
  update: function(){return true;}
})



/*
Meteor.publish("services", function(){
  return Services.find();
});

Meteor.publish("serviceCategories", function(){
  return ServiceCategories.find();
});
*/


Meteor.startup(function(){
 
/*
  collectionApi = new CollectionAPI({
    authToken: undefined,
    apiPath: 'get'
  });

  collectionApi.addCollection(Services, 'services', {
    methods: ['GET']
  });
  //collectionApi.start();
*/
});


};


//Users collection
/*
Users = new Meteor.SmartCollection('users');
if(Meteor.isServer && Users.find().count() == 0){
  
}
*/

Meteor.methods({
  deleteRecord: function(id){
    Services.update(id, {$set: {active: false}});
  },
  restoreRecord: function(id){
    Services.update(id, {$set: {active: true}});
  }
})

//This feeds the Personas select
Personas = new Meteor.Collection2('personas', {
  schema:{
    name: {
      type: [String],
      label: 'Personas',
      optional: true
    }
  }
});


if(Meteor.isServer && Personas.find().count() === 0){
  var personas = [
    {"name": ["Elderly"]},
    {"name": ["Teens"]}, 
    {"name": ["Children"]}, 
    {"name": ["Veterans and Military Personnel"]}, 
    {"name": ["Business"]},
    {"name": ["Homeless"]},
    {"name": ["Immigrants"]},
    {"name": ["Inmates/Offenders"]},
    {"name": ["Persons with Disabilities"]},
    {"name": ["Victims of Violence"]},
    {"name": ["Women"]}
  ];

  _.each(personas, function(persona){
    Personas.insert(persona);
  });
}



//This feeds the Categories dropdown
ServiceCategories = new Meteor.Collection('serviceCategories');


if(Meteor.isServer && ServiceCategories.find().count() === 0){
	var serviceCategories = [
	{"name": "Children and Families","value": "children-and-families"},
	{"name": "Educational Assistance","value":"educational-assistance"},
	{"name": "Employment", "value": "employment"},
	{"name": "Financial Assistance", "value": "financial-assistance"},
  {"name": "Business Assistance","value": "business-assistance"},
  {"name": "Health and Medical","value":"health-and-medical"},
  {"name": "Housing and Homelessness", "value": "housing-and-homelessness"},
  {"name": "Victims of Violence", "value": "victims-of-violence"}
	];

	_.each(serviceCategories, function(serviceCategory){
        ServiceCategories.insert(serviceCategory);
    });
}

if(Meteor.isServer && Services.find().count() === 0){

    var services = [
    {
      "category": 'Children and Families', "title": "Placeholder", "subTitle": "subTitle goes here","Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Children', 'Seniors']},

		{"category": 'Wellness and Social Services', "title": "Placeholder", "subTitle": "subTitle goes here", "Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']
    },
    {   "category": 'Monetary Information and Assistance', "title": "Placeholder", "subTitle": "subTitle goes here","Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']},

		{"category": 'Monetary Information and Assistance',"title": "Placeholder", "subTitle": "subTitle goes here", "Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']
    },
    {
      "category": 'Recreation and the Arts', "title": "Placeholder", "subTitle": "subTitle goes here","Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']},

		{"category": "Recreation and the Arts", "title": "Placeholder", "subTitle": "subTitle goes here", "Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']},
    {
      "category": "Education",
      "title": "Placeholder", "subTitle": "subTitle goes here","Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']},

	{"category" : "Education", "title": "Placeholder", "subTitle": "subTitle goes here", "Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']}
    ];

    _.each(services, function(service){
        Services.insert(service);

    });

}