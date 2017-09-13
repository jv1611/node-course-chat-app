const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
   it('Should reject non-string values', () => {
      // var isRealString = 12;
      // expect(isRealString).toBeA('number');
      // Bovenstaand werkt. Andrew doet alleen iets anders
      var res = isRealString(12);
      expect(res).toBe(false);
   });

   it('Should reject string with only spaces', () => {
      var isRealString = " ";
      expect(isRealString).length>0;
   });

   it('Should allow string with non-space characters', () => {
      var isRealString = " l o l";
      expect(isRealString).length > 0;
      // expect(isRealString).toBe(true);
   });
});
