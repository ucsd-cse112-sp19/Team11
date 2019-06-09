/*eslint-disable*/
import {AttributeSelector} from "../Raw-Functions/NavBarFunctions";




describe('addClass', function() {
    it('should add class to element', function() {
      
      this.$beerButton = {class:'bob'}
      var AttributeSelector = AttributeSelector.bind(this);
      var data = AttributeSelector();
  
      assert.equal(data.class, 'bob');
    });
  
    it('should not add a class which already exists');
  });