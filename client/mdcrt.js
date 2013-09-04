
  Meteor.Router.add({
    '/': 'categoriesList',
    '/services/:category': function(category){
      var cat = category.replace(/_/g, ' ');
      Session.set('currentCategory', cat);
      return 'servicesByCategory';
    },
    '/browse/:page': function(page){
      Session.set('pageToDisplay', page);
      Session.set('activeRecordCount', Services.find({'active': true}).count())
      console.log(Session.get('activeRecordCount'));
      return 'browse';
    },
    '/browse/inactive/:page': function(page){
      Session.set('pageToDisplay', page);
      return 'browseInactive';
    },
    '/edit/:id': function(id){
      Session.set('currentServiceId', id);
      heading = 'Edit Record';
      functionality = 'update';
      arrPersonas = [];
      return 'editRecord';
    },
    '/new/': function(){
      functionality = 'insert';
      heading = 'Create Record';
      Session.set('currentServiceId', '');
      arrPersonas = [];

      return 'editRecord';
    }
  });


  //Template helper functions
  Template.browse.helpers({
    results: function(){
      return Pagination.collection(Services.find({'active': true}).fetch());
    },
    pagination: function(){
      console.log('paging count: ', Session.get('activeRecordCount'));
      return Pagination.links('/browse', Session.get('activeRecordCount'), {currentPage: Session.get('pageToDisplay'), perPage: 10, style: 'bootstrap'});
    }
  });


  Template.browseInactive.helpers({
    results: function(){
      if(Services.find({'active': false}).count() > 0){
        this.length = Services.find({'active': false}).count();
      return Pagination.collection(Services.find({'active': false}).fetch());
      }
    },
    pagination: function(){
      return Pagination.links('/browse/inactive', Services.find({'active': false}).count(), {currentPage: Session.get('pageToDisplay'), perPage: 10, style: 'bootstrap'});
    },
    message: function(){
      if(Services.find({'active': false}).count() === 0){
       this.message = "No Records Found.";
      } else {
        this.message = "";
      }
      return message;
    }
  });


  Template.categoriesList.helpers({
    serviceCategories: function(){
      return ServiceCategories.find();
    },
    formattedName: function(){
      return this.name.replace(/ /g, '_');
    }
  });

  Template.servicesByCategory.helpers({
    services: function(){
      services = Services.find({'category': Session.get('currentCategory'), 'active': true}).fetch();
      return services;
      
    },
    message: function(){
      if(Services.find({'category': Session.get('currentCategory'), 'active': true}).count() > 0){
        this.message = '';
      } else {
        this.message = "No records found.";

      };
      return message;
    },
    category: function(){
      return ServiceCategories.findOne({name: Session.get('currentCategory')});
    }
  });


  Template.editRecord.helpers({
    record: function(){
      selected = Services.findOne(Session.get('currentServiceId'));
      return selected;
    },
    categories: function(){
      return ServiceCategories.find();
    },
    selected: function(option){
      if(selected)
        return selected.category == option ? 'selected': '';
    },
    functionality: function(){
      return functionality;
    },
    personas: function(){
      return Personas.find();
    },
    selectedPersona: function(option){
      if(selected && option)
        return selected.personas.indexOf(option[0]) >= 0 ? 'selected': '';
    },
    subCategories: function(){

      if(Services){
      var subCats = SubCategories.find({mainCategory: Services.findOne(Session.get('currentServiceId')).category.toLowerCase().replace(/\s/g, '-')});
      return subCats;
    }
    },
    selectedSubCategory: function(option){
      if(selected.subCategory && option){

        var selection = selected.subCategory.replace(/\s/g, "-").toLowerCase();
        return selection.indexOf(option.toLowerCase().replace(/\s/g, '-')) >= 0 ? 'selected': '';
      }
    }
  });



//Event Listeners
  Template.editRecord.events({
    'change [id=categories]':function(event, Template){
      var selection = Template.find("[id=categories]");
      var category = selection.options[selection.selectedIndex].label;
      Template.find("[id=hiddenCategory]").value = category;
      
     var subCats = SubCategories.find({mainCategory: selection.options[selection.selectedIndex].value});

      var subcategorySelector = Template.find("[id=subCategories]");
      subcategorySelector.options.length = 0;

      subCats.forEach(function(subCat){
          subcategorySelector.options[subcategorySelector.options.length] = new Option(subCat.name, subCat.value);
      })

      if(subcategorySelector.options.length == 1){
        var selection = Template.find("[id=subCategories]");
        var subcat = selection.options[selection.selectedIndex].innerHTML;
        Template.find("[id=hiddenSubCat]").value = subcat.toLowerCase().replace(/\s/g, "-");
      }

    },
    'change [id=subCategories]': function(event, Template){
      var selection = Template.find("[id=subCategories]");
      var subcat = selection.options[selection.selectedIndex].innerHTML;

      Template.find("[id=hiddenSubCat]").value = subcat;
    },
    'change [id=personas]': function(event, Template){
      var selection = Template.find("[id=personas]");
      var persona = selection.options[selection.selectedIndex].value;

      //Add values to array
      for(var i = 0; i < selection.options.length; i++){
        if(selection.options[i].selected){
          //Eliminate duplicate values
          if(arrPersonas.indexOf(selection.options[i].value) < 0)
            arrPersonas.push(selection.options[i].value);
        }
      };
      Template.find("[id=hiddenPersonas]").value = arrPersonas;
    }
    /*,
    'blur [id=address]': function(event, Template){
      Template.find("[id=hiddenDescription]").value = tinyMCE.activeEditor.getContent();
    }
    */
  });

  Template.servicesByCategory.events({
    'click .delete': function(event, Template){
      Meteor.call('deleteRecord', event.target.id);
    }
  });

  Template.browse.events({
    'click .delete': function(event, Template){
      Meteor.call('deleteRecord', event.target.id);
    }
  });

  Template.browseInactive.events({
    'click .restore': function(event, Template){
      Meteor.call('restoreRecord', event.target.id);
    }
  });



  //Callbacks for the Form
  Services.callbacks({
    insert: function(error, result, template){
      if(error){
        console.log('Insert Error:', error.message);
      } else {
        //$("#insertSuccess").modal();
        window.history.back();
      }
    }, 
    update: function(error, result, template){
      if(error){
        console.log('Edit Error:', error);
      } else {
        window.history.back();
      }
    }    
  });
