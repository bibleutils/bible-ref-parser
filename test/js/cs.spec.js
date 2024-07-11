(function() {
  var bcv_parser;

  bcv_parser = require("../../js/cs_bcv_parser.js").bcv_parser;

  describe("Parsing", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.options.osis_compaction_strategy = "b";
      return p.options.sequence_combination_strategy = "combine";
    });
    it("should round-trip OSIS references", function() {
      var bc, bcv, bcv_range, book, books, i, len, results;
      p.set_options({
        osis_compaction_strategy: "bc"
      });
      books = ["Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1Sam", "2Sam", "1Kgs", "2Kgs", "1Chr", "2Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1Cor", "2Cor", "Gal", "Eph", "Phil", "Col", "1Thess", "2Thess", "1Tim", "2Tim", "Titus", "Phlm", "Heb", "Jas", "1Pet", "2Pet", "1John", "2John", "3John", "Jude", "Rev"];
      results = [];
      for (i = 0, len = books.length; i < len; i++) {
        book = books[i];
        bc = book + ".1";
        bcv = bc + ".1";
        bcv_range = bcv + "-" + bc + ".2";
        expect(p.parse(bc).osis()).toEqual(bc);
        expect(p.parse(bcv).osis()).toEqual(bcv);
        results.push(expect(p.parse(bcv_range).osis()).toEqual(bcv_range));
      }
      return results;
    });
    it("should round-trip OSIS Apocrypha references", function() {
      var bc, bcv, bcv_range, book, books, i, j, len, len1, results;
      p.set_options({
        osis_compaction_strategy: "bc",
        ps151_strategy: "b"
      });
      p.include_apocrypha(true);
      books = ["Tob", "Jdt", "GkEsth", "Wis", "Sir", "Bar", "PrAzar", "Sus", "Bel", "SgThree", "EpJer", "1Macc", "2Macc", "3Macc", "4Macc", "1Esd", "2Esd", "PrMan", "Ps151"];
      for (i = 0, len = books.length; i < len; i++) {
        book = books[i];
        bc = book + ".1";
        bcv = bc + ".1";
        bcv_range = bcv + "-" + bc + ".2";
        expect(p.parse(bc).osis()).toEqual(bc);
        expect(p.parse(bcv).osis()).toEqual(bcv);
        expect(p.parse(bcv_range).osis()).toEqual(bcv_range);
      }
      p.set_options({
        ps151_strategy: "bc"
      });
      expect(p.parse("Ps151.1").osis()).toEqual("Ps.151");
      expect(p.parse("Ps151.1.1").osis()).toEqual("Ps.151.1");
      expect(p.parse("Ps151.1-Ps151.2").osis()).toEqual("Ps.151.1-Ps.151.2");
      p.include_apocrypha(false);
      results = [];
      for (j = 0, len1 = books.length; j < len1; j++) {
        book = books[j];
        bc = book + ".1";
        results.push(expect(p.parse(bc).osis()).toEqual(""));
      }
      return results;
    });
    return it("should handle a preceding character", function() {
      expect(p.parse(" Gen 1").osis()).toEqual("Gen.1");
      expect(p.parse("Matt5John3").osis()).toEqual("Matt.5,John.3");
      expect(p.parse("1Ps 1").osis()).toEqual("");
      return expect(p.parse("11Sam 1").osis()).toEqual("");
    });
  });

  describe("Localized book Gen (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gen (cs)", function() {
      
		expect(p.parse("Prvni kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni kniha Mojzisova 1:1'")
		expect(p.parse("Prvni kniha Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni kniha Mojzišova 1:1'")
		expect(p.parse("Prvni kniha Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni kniha Mojzísova 1:1'")
		expect(p.parse("Prvni kniha Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni kniha Mojzíšova 1:1'")
		expect(p.parse("Prvni kniha Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni kniha Mojžisova 1:1'")
		expect(p.parse("Prvni kniha Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni kniha Mojžišova 1:1'")
		expect(p.parse("Prvni kniha Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni kniha Mojžísova 1:1'")
		expect(p.parse("Prvni kniha Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni kniha Mojžíšova 1:1'")
		expect(p.parse("První kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První kniha Mojzisova 1:1'")
		expect(p.parse("První kniha Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První kniha Mojzišova 1:1'")
		expect(p.parse("První kniha Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První kniha Mojzísova 1:1'")
		expect(p.parse("První kniha Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První kniha Mojzíšova 1:1'")
		expect(p.parse("První kniha Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První kniha Mojžisova 1:1'")
		expect(p.parse("První kniha Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První kniha Mojžišova 1:1'")
		expect(p.parse("První kniha Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První kniha Mojžísova 1:1'")
		expect(p.parse("První kniha Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První kniha Mojžíšova 1:1'")
		expect(p.parse("1. kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. kniha Mojzisova 1:1'")
		expect(p.parse("1. kniha Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. kniha Mojzišova 1:1'")
		expect(p.parse("1. kniha Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. kniha Mojzísova 1:1'")
		expect(p.parse("1. kniha Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. kniha Mojzíšova 1:1'")
		expect(p.parse("1. kniha Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. kniha Mojžisova 1:1'")
		expect(p.parse("1. kniha Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. kniha Mojžišova 1:1'")
		expect(p.parse("1. kniha Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. kniha Mojžísova 1:1'")
		expect(p.parse("1. kniha Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. kniha Mojžíšova 1:1'")
		expect(p.parse("I. kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. kniha Mojzisova 1:1'")
		expect(p.parse("I. kniha Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. kniha Mojzišova 1:1'")
		expect(p.parse("I. kniha Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. kniha Mojzísova 1:1'")
		expect(p.parse("I. kniha Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. kniha Mojzíšova 1:1'")
		expect(p.parse("I. kniha Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. kniha Mojžisova 1:1'")
		expect(p.parse("I. kniha Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. kniha Mojžišova 1:1'")
		expect(p.parse("I. kniha Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. kniha Mojžísova 1:1'")
		expect(p.parse("I. kniha Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. kniha Mojžíšova 1:1'")
		expect(p.parse("1 kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 kniha Mojzisova 1:1'")
		expect(p.parse("1 kniha Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 kniha Mojzišova 1:1'")
		expect(p.parse("1 kniha Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 kniha Mojzísova 1:1'")
		expect(p.parse("1 kniha Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 kniha Mojzíšova 1:1'")
		expect(p.parse("1 kniha Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 kniha Mojžisova 1:1'")
		expect(p.parse("1 kniha Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 kniha Mojžišova 1:1'")
		expect(p.parse("1 kniha Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 kniha Mojžísova 1:1'")
		expect(p.parse("1 kniha Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 kniha Mojžíšova 1:1'")
		expect(p.parse("I kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I kniha Mojzisova 1:1'")
		expect(p.parse("I kniha Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I kniha Mojzišova 1:1'")
		expect(p.parse("I kniha Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I kniha Mojzísova 1:1'")
		expect(p.parse("I kniha Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I kniha Mojzíšova 1:1'")
		expect(p.parse("I kniha Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I kniha Mojžisova 1:1'")
		expect(p.parse("I kniha Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I kniha Mojžišova 1:1'")
		expect(p.parse("I kniha Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I kniha Mojžísova 1:1'")
		expect(p.parse("I kniha Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I kniha Mojžíšova 1:1'")
		expect(p.parse("Prvni Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni Mojzisova 1:1'")
		expect(p.parse("Prvni Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni Mojzišova 1:1'")
		expect(p.parse("Prvni Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni Mojzísova 1:1'")
		expect(p.parse("Prvni Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni Mojzíšova 1:1'")
		expect(p.parse("Prvni Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni Mojžisova 1:1'")
		expect(p.parse("Prvni Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni Mojžišova 1:1'")
		expect(p.parse("Prvni Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni Mojžísova 1:1'")
		expect(p.parse("Prvni Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Prvni Mojžíšova 1:1'")
		expect(p.parse("První Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První Mojzisova 1:1'")
		expect(p.parse("První Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První Mojzišova 1:1'")
		expect(p.parse("První Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První Mojzísova 1:1'")
		expect(p.parse("První Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První Mojzíšova 1:1'")
		expect(p.parse("První Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První Mojžisova 1:1'")
		expect(p.parse("První Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První Mojžišova 1:1'")
		expect(p.parse("První Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První Mojžísova 1:1'")
		expect(p.parse("První Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'První Mojžíšova 1:1'")
		expect(p.parse("1. Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. Mojzisova 1:1'")
		expect(p.parse("1. Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. Mojzišova 1:1'")
		expect(p.parse("1. Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. Mojzísova 1:1'")
		expect(p.parse("1. Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. Mojzíšova 1:1'")
		expect(p.parse("1. Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. Mojžisova 1:1'")
		expect(p.parse("1. Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. Mojžišova 1:1'")
		expect(p.parse("1. Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. Mojžísova 1:1'")
		expect(p.parse("1. Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. Mojžíšova 1:1'")
		expect(p.parse("I. Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. Mojzisova 1:1'")
		expect(p.parse("I. Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. Mojzišova 1:1'")
		expect(p.parse("I. Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. Mojzísova 1:1'")
		expect(p.parse("I. Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. Mojzíšova 1:1'")
		expect(p.parse("I. Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. Mojžisova 1:1'")
		expect(p.parse("I. Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. Mojžišova 1:1'")
		expect(p.parse("I. Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. Mojžísova 1:1'")
		expect(p.parse("I. Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. Mojžíšova 1:1'")
		expect(p.parse("1 Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 Mojzisova 1:1'")
		expect(p.parse("1 Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 Mojzišova 1:1'")
		expect(p.parse("1 Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 Mojzísova 1:1'")
		expect(p.parse("1 Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 Mojzíšova 1:1'")
		expect(p.parse("1 Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 Mojžisova 1:1'")
		expect(p.parse("1 Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 Mojžišova 1:1'")
		expect(p.parse("1 Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 Mojžísova 1:1'")
		expect(p.parse("1 Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 Mojžíšova 1:1'")
		expect(p.parse("I Mojzisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I Mojzisova 1:1'")
		expect(p.parse("I Mojzišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I Mojzišova 1:1'")
		expect(p.parse("I Mojzísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I Mojzísova 1:1'")
		expect(p.parse("I Mojzíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I Mojzíšova 1:1'")
		expect(p.parse("I Mojžisova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I Mojžisova 1:1'")
		expect(p.parse("I Mojžišova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I Mojžišova 1:1'")
		expect(p.parse("I Mojžísova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I Mojžísova 1:1'")
		expect(p.parse("I Mojžíšova 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I Mojžíšova 1:1'")
		expect(p.parse("Genesis 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Genesis 1:1'")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Gen 1:1'")
		expect(p.parse("Gn 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Gn 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PRVNI KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI KNIHA MOJZISOVA 1:1'")
		expect(p.parse("PRVNI KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("PRVNI KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("PRVNI KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("PRVNI KNIHA MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("PRVNI KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("PRVNI KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("PRVNI KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("PRVNÍ KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ KNIHA MOJZISOVA 1:1'")
		expect(p.parse("PRVNÍ KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("PRVNÍ KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("PRVNÍ KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("PRVNÍ KNIHA MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("PRVNÍ KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("PRVNÍ KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("PRVNÍ KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("1. KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. KNIHA MOJZISOVA 1:1'")
		expect(p.parse("1. KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("1. KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("1. KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("1. KNIHA MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("1. KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("1. KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("1. KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("I. KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. KNIHA MOJZISOVA 1:1'")
		expect(p.parse("I. KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("I. KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("I. KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("I. KNIHA MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("I. KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("I. KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("I. KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("1 KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 KNIHA MOJZISOVA 1:1'")
		expect(p.parse("1 KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("1 KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("1 KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("1 KNIHA MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("1 KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("1 KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("1 KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("I KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I KNIHA MOJZISOVA 1:1'")
		expect(p.parse("I KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("I KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("I KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("I KNIHA MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("I KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("I KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("I KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("PRVNI MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI MOJZISOVA 1:1'")
		expect(p.parse("PRVNI MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI MOJZIŠOVA 1:1'")
		expect(p.parse("PRVNI MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI MOJZÍSOVA 1:1'")
		expect(p.parse("PRVNI MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI MOJZÍŠOVA 1:1'")
		expect(p.parse("PRVNI MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI MOJŽISOVA 1:1'")
		expect(p.parse("PRVNI MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI MOJŽIŠOVA 1:1'")
		expect(p.parse("PRVNI MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI MOJŽÍSOVA 1:1'")
		expect(p.parse("PRVNI MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNI MOJŽÍŠOVA 1:1'")
		expect(p.parse("PRVNÍ MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ MOJZISOVA 1:1'")
		expect(p.parse("PRVNÍ MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ MOJZIŠOVA 1:1'")
		expect(p.parse("PRVNÍ MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ MOJZÍSOVA 1:1'")
		expect(p.parse("PRVNÍ MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ MOJZÍŠOVA 1:1'")
		expect(p.parse("PRVNÍ MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ MOJŽISOVA 1:1'")
		expect(p.parse("PRVNÍ MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ MOJŽIŠOVA 1:1'")
		expect(p.parse("PRVNÍ MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ MOJŽÍSOVA 1:1'")
		expect(p.parse("PRVNÍ MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'PRVNÍ MOJŽÍŠOVA 1:1'")
		expect(p.parse("1. MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. MOJZISOVA 1:1'")
		expect(p.parse("1. MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. MOJZIŠOVA 1:1'")
		expect(p.parse("1. MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. MOJZÍSOVA 1:1'")
		expect(p.parse("1. MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. MOJZÍŠOVA 1:1'")
		expect(p.parse("1. MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. MOJŽISOVA 1:1'")
		expect(p.parse("1. MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. MOJŽIŠOVA 1:1'")
		expect(p.parse("1. MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. MOJŽÍSOVA 1:1'")
		expect(p.parse("1. MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. MOJŽÍŠOVA 1:1'")
		expect(p.parse("I. MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. MOJZISOVA 1:1'")
		expect(p.parse("I. MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. MOJZIŠOVA 1:1'")
		expect(p.parse("I. MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. MOJZÍSOVA 1:1'")
		expect(p.parse("I. MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. MOJZÍŠOVA 1:1'")
		expect(p.parse("I. MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. MOJŽISOVA 1:1'")
		expect(p.parse("I. MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. MOJŽIŠOVA 1:1'")
		expect(p.parse("I. MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. MOJŽÍSOVA 1:1'")
		expect(p.parse("I. MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. MOJŽÍŠOVA 1:1'")
		expect(p.parse("1 MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 MOJZISOVA 1:1'")
		expect(p.parse("1 MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 MOJZIŠOVA 1:1'")
		expect(p.parse("1 MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 MOJZÍSOVA 1:1'")
		expect(p.parse("1 MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 MOJZÍŠOVA 1:1'")
		expect(p.parse("1 MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 MOJŽISOVA 1:1'")
		expect(p.parse("1 MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 MOJŽIŠOVA 1:1'")
		expect(p.parse("1 MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 MOJŽÍSOVA 1:1'")
		expect(p.parse("1 MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 MOJŽÍŠOVA 1:1'")
		expect(p.parse("I MOJZISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I MOJZISOVA 1:1'")
		expect(p.parse("I MOJZIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I MOJZIŠOVA 1:1'")
		expect(p.parse("I MOJZÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I MOJZÍSOVA 1:1'")
		expect(p.parse("I MOJZÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I MOJZÍŠOVA 1:1'")
		expect(p.parse("I MOJŽISOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I MOJŽISOVA 1:1'")
		expect(p.parse("I MOJŽIŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I MOJŽIŠOVA 1:1'")
		expect(p.parse("I MOJŽÍSOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I MOJŽÍSOVA 1:1'")
		expect(p.parse("I MOJŽÍŠOVA 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I MOJŽÍŠOVA 1:1'")
		expect(p.parse("GENESIS 1:1").osis()).toEqual("Gen.1.1", "parsing: 'GENESIS 1:1'")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1", "parsing: 'GEN 1:1'")
		expect(p.parse("GN 1:1").osis()).toEqual("Gen.1.1", "parsing: 'GN 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Exod (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Exod (cs)", function() {
      
		expect(p.parse("Druha kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha kniha Mojzisova 1:1'")
		expect(p.parse("Druha kniha Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha kniha Mojzišova 1:1'")
		expect(p.parse("Druha kniha Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha kniha Mojzísova 1:1'")
		expect(p.parse("Druha kniha Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha kniha Mojzíšova 1:1'")
		expect(p.parse("Druha kniha Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha kniha Mojžisova 1:1'")
		expect(p.parse("Druha kniha Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha kniha Mojžišova 1:1'")
		expect(p.parse("Druha kniha Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha kniha Mojžísova 1:1'")
		expect(p.parse("Druha kniha Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha kniha Mojžíšova 1:1'")
		expect(p.parse("Druhy kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy kniha Mojzisova 1:1'")
		expect(p.parse("Druhy kniha Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy kniha Mojzišova 1:1'")
		expect(p.parse("Druhy kniha Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy kniha Mojzísova 1:1'")
		expect(p.parse("Druhy kniha Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy kniha Mojzíšova 1:1'")
		expect(p.parse("Druhy kniha Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy kniha Mojžisova 1:1'")
		expect(p.parse("Druhy kniha Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy kniha Mojžišova 1:1'")
		expect(p.parse("Druhy kniha Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy kniha Mojžísova 1:1'")
		expect(p.parse("Druhy kniha Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy kniha Mojžíšova 1:1'")
		expect(p.parse("Druhá kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá kniha Mojzisova 1:1'")
		expect(p.parse("Druhá kniha Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá kniha Mojzišova 1:1'")
		expect(p.parse("Druhá kniha Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá kniha Mojzísova 1:1'")
		expect(p.parse("Druhá kniha Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá kniha Mojzíšova 1:1'")
		expect(p.parse("Druhá kniha Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá kniha Mojžisova 1:1'")
		expect(p.parse("Druhá kniha Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá kniha Mojžišova 1:1'")
		expect(p.parse("Druhá kniha Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá kniha Mojžísova 1:1'")
		expect(p.parse("Druhá kniha Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá kniha Mojžíšova 1:1'")
		expect(p.parse("Druhý kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý kniha Mojzisova 1:1'")
		expect(p.parse("Druhý kniha Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý kniha Mojzišova 1:1'")
		expect(p.parse("Druhý kniha Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý kniha Mojzísova 1:1'")
		expect(p.parse("Druhý kniha Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý kniha Mojzíšova 1:1'")
		expect(p.parse("Druhý kniha Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý kniha Mojžisova 1:1'")
		expect(p.parse("Druhý kniha Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý kniha Mojžišova 1:1'")
		expect(p.parse("Druhý kniha Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý kniha Mojžísova 1:1'")
		expect(p.parse("Druhý kniha Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý kniha Mojžíšova 1:1'")
		expect(p.parse("II. kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. kniha Mojzisova 1:1'")
		expect(p.parse("II. kniha Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. kniha Mojzišova 1:1'")
		expect(p.parse("II. kniha Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. kniha Mojzísova 1:1'")
		expect(p.parse("II. kniha Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. kniha Mojzíšova 1:1'")
		expect(p.parse("II. kniha Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. kniha Mojžisova 1:1'")
		expect(p.parse("II. kniha Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. kniha Mojžišova 1:1'")
		expect(p.parse("II. kniha Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. kniha Mojžísova 1:1'")
		expect(p.parse("II. kniha Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. kniha Mojžíšova 1:1'")
		expect(p.parse("2. kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. kniha Mojzisova 1:1'")
		expect(p.parse("2. kniha Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. kniha Mojzišova 1:1'")
		expect(p.parse("2. kniha Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. kniha Mojzísova 1:1'")
		expect(p.parse("2. kniha Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. kniha Mojzíšova 1:1'")
		expect(p.parse("2. kniha Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. kniha Mojžisova 1:1'")
		expect(p.parse("2. kniha Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. kniha Mojžišova 1:1'")
		expect(p.parse("2. kniha Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. kniha Mojžísova 1:1'")
		expect(p.parse("2. kniha Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. kniha Mojžíšova 1:1'")
		expect(p.parse("II kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II kniha Mojzisova 1:1'")
		expect(p.parse("II kniha Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II kniha Mojzišova 1:1'")
		expect(p.parse("II kniha Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II kniha Mojzísova 1:1'")
		expect(p.parse("II kniha Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II kniha Mojzíšova 1:1'")
		expect(p.parse("II kniha Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II kniha Mojžisova 1:1'")
		expect(p.parse("II kniha Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II kniha Mojžišova 1:1'")
		expect(p.parse("II kniha Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II kniha Mojžísova 1:1'")
		expect(p.parse("II kniha Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II kniha Mojžíšova 1:1'")
		expect(p.parse("2 kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 kniha Mojzisova 1:1'")
		expect(p.parse("2 kniha Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 kniha Mojzišova 1:1'")
		expect(p.parse("2 kniha Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 kniha Mojzísova 1:1'")
		expect(p.parse("2 kniha Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 kniha Mojzíšova 1:1'")
		expect(p.parse("2 kniha Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 kniha Mojžisova 1:1'")
		expect(p.parse("2 kniha Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 kniha Mojžišova 1:1'")
		expect(p.parse("2 kniha Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 kniha Mojžísova 1:1'")
		expect(p.parse("2 kniha Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 kniha Mojžíšova 1:1'")
		expect(p.parse("Druha Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha Mojzisova 1:1'")
		expect(p.parse("Druha Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha Mojzišova 1:1'")
		expect(p.parse("Druha Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha Mojzísova 1:1'")
		expect(p.parse("Druha Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha Mojzíšova 1:1'")
		expect(p.parse("Druha Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha Mojžisova 1:1'")
		expect(p.parse("Druha Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha Mojžišova 1:1'")
		expect(p.parse("Druha Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha Mojžísova 1:1'")
		expect(p.parse("Druha Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druha Mojžíšova 1:1'")
		expect(p.parse("Druhy Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy Mojzisova 1:1'")
		expect(p.parse("Druhy Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy Mojzišova 1:1'")
		expect(p.parse("Druhy Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy Mojzísova 1:1'")
		expect(p.parse("Druhy Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy Mojzíšova 1:1'")
		expect(p.parse("Druhy Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy Mojžisova 1:1'")
		expect(p.parse("Druhy Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy Mojžišova 1:1'")
		expect(p.parse("Druhy Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy Mojžísova 1:1'")
		expect(p.parse("Druhy Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhy Mojžíšova 1:1'")
		expect(p.parse("Druhá Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá Mojzisova 1:1'")
		expect(p.parse("Druhá Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá Mojzišova 1:1'")
		expect(p.parse("Druhá Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá Mojzísova 1:1'")
		expect(p.parse("Druhá Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá Mojzíšova 1:1'")
		expect(p.parse("Druhá Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá Mojžisova 1:1'")
		expect(p.parse("Druhá Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá Mojžišova 1:1'")
		expect(p.parse("Druhá Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá Mojžísova 1:1'")
		expect(p.parse("Druhá Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhá Mojžíšova 1:1'")
		expect(p.parse("Druhý Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý Mojzisova 1:1'")
		expect(p.parse("Druhý Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý Mojzišova 1:1'")
		expect(p.parse("Druhý Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý Mojzísova 1:1'")
		expect(p.parse("Druhý Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý Mojzíšova 1:1'")
		expect(p.parse("Druhý Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý Mojžisova 1:1'")
		expect(p.parse("Druhý Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý Mojžišova 1:1'")
		expect(p.parse("Druhý Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý Mojžísova 1:1'")
		expect(p.parse("Druhý Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Druhý Mojžíšova 1:1'")
		expect(p.parse("II. Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. Mojzisova 1:1'")
		expect(p.parse("II. Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. Mojzišova 1:1'")
		expect(p.parse("II. Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. Mojzísova 1:1'")
		expect(p.parse("II. Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. Mojzíšova 1:1'")
		expect(p.parse("II. Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. Mojžisova 1:1'")
		expect(p.parse("II. Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. Mojžišova 1:1'")
		expect(p.parse("II. Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. Mojžísova 1:1'")
		expect(p.parse("II. Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. Mojžíšova 1:1'")
		expect(p.parse("2. Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. Mojzisova 1:1'")
		expect(p.parse("2. Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. Mojzišova 1:1'")
		expect(p.parse("2. Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. Mojzísova 1:1'")
		expect(p.parse("2. Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. Mojzíšova 1:1'")
		expect(p.parse("2. Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. Mojžisova 1:1'")
		expect(p.parse("2. Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. Mojžišova 1:1'")
		expect(p.parse("2. Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. Mojžísova 1:1'")
		expect(p.parse("2. Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. Mojžíšova 1:1'")
		expect(p.parse("II Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II Mojzisova 1:1'")
		expect(p.parse("II Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II Mojzišova 1:1'")
		expect(p.parse("II Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II Mojzísova 1:1'")
		expect(p.parse("II Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II Mojzíšova 1:1'")
		expect(p.parse("II Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II Mojžisova 1:1'")
		expect(p.parse("II Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II Mojžišova 1:1'")
		expect(p.parse("II Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II Mojžísova 1:1'")
		expect(p.parse("II Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II Mojžíšova 1:1'")
		expect(p.parse("2 Mojzisova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 Mojzisova 1:1'")
		expect(p.parse("2 Mojzišova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 Mojzišova 1:1'")
		expect(p.parse("2 Mojzísova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 Mojzísova 1:1'")
		expect(p.parse("2 Mojzíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 Mojzíšova 1:1'")
		expect(p.parse("2 Mojžisova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 Mojžisova 1:1'")
		expect(p.parse("2 Mojžišova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 Mojžišova 1:1'")
		expect(p.parse("2 Mojžísova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 Mojžísova 1:1'")
		expect(p.parse("2 Mojžíšova 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 Mojžíšova 1:1'")
		expect(p.parse("Exodus 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Exodus 1:1'")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Exod 1:1'")
		expect(p.parse("Ex 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Ex 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("DRUHA KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA KNIHA MOJZISOVA 1:1'")
		expect(p.parse("DRUHA KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("DRUHA KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("DRUHA KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("DRUHA KNIHA MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("DRUHA KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("DRUHA KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("DRUHA KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("DRUHY KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY KNIHA MOJZISOVA 1:1'")
		expect(p.parse("DRUHY KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("DRUHY KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("DRUHY KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("DRUHY KNIHA MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("DRUHY KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("DRUHY KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("DRUHY KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("DRUHÁ KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ KNIHA MOJZISOVA 1:1'")
		expect(p.parse("DRUHÁ KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("DRUHÁ KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("DRUHÁ KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("DRUHÁ KNIHA MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("DRUHÁ KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("DRUHÁ KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("DRUHÁ KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("DRUHÝ KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ KNIHA MOJZISOVA 1:1'")
		expect(p.parse("DRUHÝ KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("DRUHÝ KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("DRUHÝ KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("DRUHÝ KNIHA MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("DRUHÝ KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("DRUHÝ KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("DRUHÝ KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("II. KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. KNIHA MOJZISOVA 1:1'")
		expect(p.parse("II. KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("II. KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("II. KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("II. KNIHA MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("II. KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("II. KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("II. KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("2. KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. KNIHA MOJZISOVA 1:1'")
		expect(p.parse("2. KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("2. KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("2. KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("2. KNIHA MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("2. KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("2. KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("2. KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("II KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II KNIHA MOJZISOVA 1:1'")
		expect(p.parse("II KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("II KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("II KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("II KNIHA MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("II KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("II KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("II KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("2 KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 KNIHA MOJZISOVA 1:1'")
		expect(p.parse("2 KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("2 KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("2 KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("2 KNIHA MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("2 KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("2 KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("2 KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("DRUHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA MOJZISOVA 1:1'")
		expect(p.parse("DRUHA MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA MOJZIŠOVA 1:1'")
		expect(p.parse("DRUHA MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA MOJZÍSOVA 1:1'")
		expect(p.parse("DRUHA MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA MOJZÍŠOVA 1:1'")
		expect(p.parse("DRUHA MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA MOJŽISOVA 1:1'")
		expect(p.parse("DRUHA MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA MOJŽIŠOVA 1:1'")
		expect(p.parse("DRUHA MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA MOJŽÍSOVA 1:1'")
		expect(p.parse("DRUHA MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("DRUHY MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY MOJZISOVA 1:1'")
		expect(p.parse("DRUHY MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY MOJZIŠOVA 1:1'")
		expect(p.parse("DRUHY MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY MOJZÍSOVA 1:1'")
		expect(p.parse("DRUHY MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY MOJZÍŠOVA 1:1'")
		expect(p.parse("DRUHY MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY MOJŽISOVA 1:1'")
		expect(p.parse("DRUHY MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY MOJŽIŠOVA 1:1'")
		expect(p.parse("DRUHY MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY MOJŽÍSOVA 1:1'")
		expect(p.parse("DRUHY MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHY MOJŽÍŠOVA 1:1'")
		expect(p.parse("DRUHÁ MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ MOJZISOVA 1:1'")
		expect(p.parse("DRUHÁ MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ MOJZIŠOVA 1:1'")
		expect(p.parse("DRUHÁ MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ MOJZÍSOVA 1:1'")
		expect(p.parse("DRUHÁ MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ MOJZÍŠOVA 1:1'")
		expect(p.parse("DRUHÁ MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ MOJŽISOVA 1:1'")
		expect(p.parse("DRUHÁ MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ MOJŽIŠOVA 1:1'")
		expect(p.parse("DRUHÁ MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ MOJŽÍSOVA 1:1'")
		expect(p.parse("DRUHÁ MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÁ MOJŽÍŠOVA 1:1'")
		expect(p.parse("DRUHÝ MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ MOJZISOVA 1:1'")
		expect(p.parse("DRUHÝ MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ MOJZIŠOVA 1:1'")
		expect(p.parse("DRUHÝ MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ MOJZÍSOVA 1:1'")
		expect(p.parse("DRUHÝ MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ MOJZÍŠOVA 1:1'")
		expect(p.parse("DRUHÝ MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ MOJŽISOVA 1:1'")
		expect(p.parse("DRUHÝ MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ MOJŽIŠOVA 1:1'")
		expect(p.parse("DRUHÝ MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ MOJŽÍSOVA 1:1'")
		expect(p.parse("DRUHÝ MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'DRUHÝ MOJŽÍŠOVA 1:1'")
		expect(p.parse("II. MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. MOJZISOVA 1:1'")
		expect(p.parse("II. MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. MOJZIŠOVA 1:1'")
		expect(p.parse("II. MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. MOJZÍSOVA 1:1'")
		expect(p.parse("II. MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. MOJZÍŠOVA 1:1'")
		expect(p.parse("II. MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. MOJŽISOVA 1:1'")
		expect(p.parse("II. MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. MOJŽIŠOVA 1:1'")
		expect(p.parse("II. MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. MOJŽÍSOVA 1:1'")
		expect(p.parse("II. MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. MOJŽÍŠOVA 1:1'")
		expect(p.parse("2. MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. MOJZISOVA 1:1'")
		expect(p.parse("2. MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. MOJZIŠOVA 1:1'")
		expect(p.parse("2. MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. MOJZÍSOVA 1:1'")
		expect(p.parse("2. MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. MOJZÍŠOVA 1:1'")
		expect(p.parse("2. MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. MOJŽISOVA 1:1'")
		expect(p.parse("2. MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. MOJŽIŠOVA 1:1'")
		expect(p.parse("2. MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. MOJŽÍSOVA 1:1'")
		expect(p.parse("2. MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. MOJŽÍŠOVA 1:1'")
		expect(p.parse("II MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II MOJZISOVA 1:1'")
		expect(p.parse("II MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II MOJZIŠOVA 1:1'")
		expect(p.parse("II MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II MOJZÍSOVA 1:1'")
		expect(p.parse("II MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II MOJZÍŠOVA 1:1'")
		expect(p.parse("II MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II MOJŽISOVA 1:1'")
		expect(p.parse("II MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II MOJŽIŠOVA 1:1'")
		expect(p.parse("II MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II MOJŽÍSOVA 1:1'")
		expect(p.parse("II MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II MOJŽÍŠOVA 1:1'")
		expect(p.parse("2 MOJZISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 MOJZISOVA 1:1'")
		expect(p.parse("2 MOJZIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 MOJZIŠOVA 1:1'")
		expect(p.parse("2 MOJZÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 MOJZÍSOVA 1:1'")
		expect(p.parse("2 MOJZÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 MOJZÍŠOVA 1:1'")
		expect(p.parse("2 MOJŽISOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 MOJŽISOVA 1:1'")
		expect(p.parse("2 MOJŽIŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 MOJŽIŠOVA 1:1'")
		expect(p.parse("2 MOJŽÍSOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 MOJŽÍSOVA 1:1'")
		expect(p.parse("2 MOJŽÍŠOVA 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 MOJŽÍŠOVA 1:1'")
		expect(p.parse("EXODUS 1:1").osis()).toEqual("Exod.1.1", "parsing: 'EXODUS 1:1'")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1", "parsing: 'EXOD 1:1'")
		expect(p.parse("EX 1:1").osis()).toEqual("Exod.1.1", "parsing: 'EX 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Bel (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bel (cs)", function() {
      
		expect(p.parse("Bel a drak 1:1").osis()).toEqual("Bel.1.1", "parsing: 'Bel a drak 1:1'")
		expect(p.parse("Bél a drak 1:1").osis()).toEqual("Bel.1.1", "parsing: 'Bél a drak 1:1'")
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1", "parsing: 'Bel 1:1'")
		expect(p.parse("Bél 1:1").osis()).toEqual("Bel.1.1", "parsing: 'Bél 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Lev (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lev (cs)", function() {
      
		expect(p.parse("Treti kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti kniha Mojzisova 1:1'")
		expect(p.parse("Treti kniha Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti kniha Mojzišova 1:1'")
		expect(p.parse("Treti kniha Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti kniha Mojzísova 1:1'")
		expect(p.parse("Treti kniha Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti kniha Mojzíšova 1:1'")
		expect(p.parse("Treti kniha Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti kniha Mojžisova 1:1'")
		expect(p.parse("Treti kniha Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti kniha Mojžišova 1:1'")
		expect(p.parse("Treti kniha Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti kniha Mojžísova 1:1'")
		expect(p.parse("Treti kniha Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti kniha Mojžíšova 1:1'")
		expect(p.parse("Tretí kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí kniha Mojzisova 1:1'")
		expect(p.parse("Tretí kniha Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí kniha Mojzišova 1:1'")
		expect(p.parse("Tretí kniha Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí kniha Mojzísova 1:1'")
		expect(p.parse("Tretí kniha Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí kniha Mojzíšova 1:1'")
		expect(p.parse("Tretí kniha Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí kniha Mojžisova 1:1'")
		expect(p.parse("Tretí kniha Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí kniha Mojžišova 1:1'")
		expect(p.parse("Tretí kniha Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí kniha Mojžísova 1:1'")
		expect(p.parse("Tretí kniha Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí kniha Mojžíšova 1:1'")
		expect(p.parse("Třeti kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti kniha Mojzisova 1:1'")
		expect(p.parse("Třeti kniha Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti kniha Mojzišova 1:1'")
		expect(p.parse("Třeti kniha Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti kniha Mojzísova 1:1'")
		expect(p.parse("Třeti kniha Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti kniha Mojzíšova 1:1'")
		expect(p.parse("Třeti kniha Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti kniha Mojžisova 1:1'")
		expect(p.parse("Třeti kniha Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti kniha Mojžišova 1:1'")
		expect(p.parse("Třeti kniha Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti kniha Mojžísova 1:1'")
		expect(p.parse("Třeti kniha Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti kniha Mojžíšova 1:1'")
		expect(p.parse("Třetí kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí kniha Mojzisova 1:1'")
		expect(p.parse("Třetí kniha Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí kniha Mojzišova 1:1'")
		expect(p.parse("Třetí kniha Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí kniha Mojzísova 1:1'")
		expect(p.parse("Třetí kniha Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí kniha Mojzíšova 1:1'")
		expect(p.parse("Třetí kniha Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí kniha Mojžisova 1:1'")
		expect(p.parse("Třetí kniha Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí kniha Mojžišova 1:1'")
		expect(p.parse("Třetí kniha Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí kniha Mojžísova 1:1'")
		expect(p.parse("Třetí kniha Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí kniha Mojžíšova 1:1'")
		expect(p.parse("III. kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. kniha Mojzisova 1:1'")
		expect(p.parse("III. kniha Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. kniha Mojzišova 1:1'")
		expect(p.parse("III. kniha Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. kniha Mojzísova 1:1'")
		expect(p.parse("III. kniha Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. kniha Mojzíšova 1:1'")
		expect(p.parse("III. kniha Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. kniha Mojžisova 1:1'")
		expect(p.parse("III. kniha Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. kniha Mojžišova 1:1'")
		expect(p.parse("III. kniha Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. kniha Mojžísova 1:1'")
		expect(p.parse("III. kniha Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. kniha Mojžíšova 1:1'")
		expect(p.parse("III kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III kniha Mojzisova 1:1'")
		expect(p.parse("III kniha Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III kniha Mojzišova 1:1'")
		expect(p.parse("III kniha Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III kniha Mojzísova 1:1'")
		expect(p.parse("III kniha Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III kniha Mojzíšova 1:1'")
		expect(p.parse("III kniha Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III kniha Mojžisova 1:1'")
		expect(p.parse("III kniha Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III kniha Mojžišova 1:1'")
		expect(p.parse("III kniha Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III kniha Mojžísova 1:1'")
		expect(p.parse("III kniha Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III kniha Mojžíšova 1:1'")
		expect(p.parse("3. kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. kniha Mojzisova 1:1'")
		expect(p.parse("3. kniha Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. kniha Mojzišova 1:1'")
		expect(p.parse("3. kniha Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. kniha Mojzísova 1:1'")
		expect(p.parse("3. kniha Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. kniha Mojzíšova 1:1'")
		expect(p.parse("3. kniha Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. kniha Mojžisova 1:1'")
		expect(p.parse("3. kniha Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. kniha Mojžišova 1:1'")
		expect(p.parse("3. kniha Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. kniha Mojžísova 1:1'")
		expect(p.parse("3. kniha Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. kniha Mojžíšova 1:1'")
		expect(p.parse("3 kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 kniha Mojzisova 1:1'")
		expect(p.parse("3 kniha Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 kniha Mojzišova 1:1'")
		expect(p.parse("3 kniha Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 kniha Mojzísova 1:1'")
		expect(p.parse("3 kniha Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 kniha Mojzíšova 1:1'")
		expect(p.parse("3 kniha Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 kniha Mojžisova 1:1'")
		expect(p.parse("3 kniha Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 kniha Mojžišova 1:1'")
		expect(p.parse("3 kniha Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 kniha Mojžísova 1:1'")
		expect(p.parse("3 kniha Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 kniha Mojžíšova 1:1'")
		expect(p.parse("Treti Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti Mojzisova 1:1'")
		expect(p.parse("Treti Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti Mojzišova 1:1'")
		expect(p.parse("Treti Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti Mojzísova 1:1'")
		expect(p.parse("Treti Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti Mojzíšova 1:1'")
		expect(p.parse("Treti Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti Mojžisova 1:1'")
		expect(p.parse("Treti Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti Mojžišova 1:1'")
		expect(p.parse("Treti Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti Mojžísova 1:1'")
		expect(p.parse("Treti Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Treti Mojžíšova 1:1'")
		expect(p.parse("Tretí Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí Mojzisova 1:1'")
		expect(p.parse("Tretí Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí Mojzišova 1:1'")
		expect(p.parse("Tretí Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí Mojzísova 1:1'")
		expect(p.parse("Tretí Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí Mojzíšova 1:1'")
		expect(p.parse("Tretí Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí Mojžisova 1:1'")
		expect(p.parse("Tretí Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí Mojžišova 1:1'")
		expect(p.parse("Tretí Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí Mojžísova 1:1'")
		expect(p.parse("Tretí Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Tretí Mojžíšova 1:1'")
		expect(p.parse("Třeti Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti Mojzisova 1:1'")
		expect(p.parse("Třeti Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti Mojzišova 1:1'")
		expect(p.parse("Třeti Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti Mojzísova 1:1'")
		expect(p.parse("Třeti Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti Mojzíšova 1:1'")
		expect(p.parse("Třeti Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti Mojžisova 1:1'")
		expect(p.parse("Třeti Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti Mojžišova 1:1'")
		expect(p.parse("Třeti Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti Mojžísova 1:1'")
		expect(p.parse("Třeti Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třeti Mojžíšova 1:1'")
		expect(p.parse("Třetí Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí Mojzisova 1:1'")
		expect(p.parse("Třetí Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí Mojzišova 1:1'")
		expect(p.parse("Třetí Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí Mojzísova 1:1'")
		expect(p.parse("Třetí Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí Mojzíšova 1:1'")
		expect(p.parse("Třetí Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí Mojžisova 1:1'")
		expect(p.parse("Třetí Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí Mojžišova 1:1'")
		expect(p.parse("Třetí Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí Mojžísova 1:1'")
		expect(p.parse("Třetí Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Třetí Mojžíšova 1:1'")
		expect(p.parse("III. Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. Mojzisova 1:1'")
		expect(p.parse("III. Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. Mojzišova 1:1'")
		expect(p.parse("III. Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. Mojzísova 1:1'")
		expect(p.parse("III. Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. Mojzíšova 1:1'")
		expect(p.parse("III. Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. Mojžisova 1:1'")
		expect(p.parse("III. Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. Mojžišova 1:1'")
		expect(p.parse("III. Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. Mojžísova 1:1'")
		expect(p.parse("III. Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. Mojžíšova 1:1'")
		expect(p.parse("III Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III Mojzisova 1:1'")
		expect(p.parse("III Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III Mojzišova 1:1'")
		expect(p.parse("III Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III Mojzísova 1:1'")
		expect(p.parse("III Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III Mojzíšova 1:1'")
		expect(p.parse("III Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III Mojžisova 1:1'")
		expect(p.parse("III Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III Mojžišova 1:1'")
		expect(p.parse("III Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III Mojžísova 1:1'")
		expect(p.parse("III Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III Mojžíšova 1:1'")
		expect(p.parse("3. Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. Mojzisova 1:1'")
		expect(p.parse("3. Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. Mojzišova 1:1'")
		expect(p.parse("3. Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. Mojzísova 1:1'")
		expect(p.parse("3. Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. Mojzíšova 1:1'")
		expect(p.parse("3. Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. Mojžisova 1:1'")
		expect(p.parse("3. Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. Mojžišova 1:1'")
		expect(p.parse("3. Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. Mojžísova 1:1'")
		expect(p.parse("3. Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. Mojžíšova 1:1'")
		expect(p.parse("3 Mojzisova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 Mojzisova 1:1'")
		expect(p.parse("3 Mojzišova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 Mojzišova 1:1'")
		expect(p.parse("3 Mojzísova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 Mojzísova 1:1'")
		expect(p.parse("3 Mojzíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 Mojzíšova 1:1'")
		expect(p.parse("3 Mojžisova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 Mojžisova 1:1'")
		expect(p.parse("3 Mojžišova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 Mojžišova 1:1'")
		expect(p.parse("3 Mojžísova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 Mojžísova 1:1'")
		expect(p.parse("3 Mojžíšova 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 Mojžíšova 1:1'")
		expect(p.parse("Leviticusi 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Leviticusi 1:1'")
		expect(p.parse("Leviticus 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Leviticus 1:1'")
		expect(p.parse("Levitikus 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Levitikus 1:1'")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Lev 1:1'")
		expect(p.parse("Lv 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Lv 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("TRETI KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI KNIHA MOJZISOVA 1:1'")
		expect(p.parse("TRETI KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("TRETI KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("TRETI KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("TRETI KNIHA MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("TRETI KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("TRETI KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("TRETI KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("TRETÍ KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ KNIHA MOJZISOVA 1:1'")
		expect(p.parse("TRETÍ KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("TRETÍ KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("TRETÍ KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("TRETÍ KNIHA MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("TRETÍ KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("TRETÍ KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("TRETÍ KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("TŘETI KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI KNIHA MOJZISOVA 1:1'")
		expect(p.parse("TŘETI KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("TŘETI KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("TŘETI KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("TŘETI KNIHA MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("TŘETI KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("TŘETI KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("TŘETI KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("TŘETÍ KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ KNIHA MOJZISOVA 1:1'")
		expect(p.parse("TŘETÍ KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("TŘETÍ KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("TŘETÍ KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("TŘETÍ KNIHA MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("TŘETÍ KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("TŘETÍ KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("TŘETÍ KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("III. KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. KNIHA MOJZISOVA 1:1'")
		expect(p.parse("III. KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("III. KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("III. KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("III. KNIHA MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("III. KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("III. KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("III. KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("III KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III KNIHA MOJZISOVA 1:1'")
		expect(p.parse("III KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("III KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("III KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("III KNIHA MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("III KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("III KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("III KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("3. KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. KNIHA MOJZISOVA 1:1'")
		expect(p.parse("3. KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("3. KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("3. KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("3. KNIHA MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("3. KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("3. KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("3. KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("3 KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 KNIHA MOJZISOVA 1:1'")
		expect(p.parse("3 KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("3 KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("3 KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("3 KNIHA MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("3 KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("3 KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("3 KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("TRETI MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI MOJZISOVA 1:1'")
		expect(p.parse("TRETI MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI MOJZIŠOVA 1:1'")
		expect(p.parse("TRETI MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI MOJZÍSOVA 1:1'")
		expect(p.parse("TRETI MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI MOJZÍŠOVA 1:1'")
		expect(p.parse("TRETI MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI MOJŽISOVA 1:1'")
		expect(p.parse("TRETI MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI MOJŽIŠOVA 1:1'")
		expect(p.parse("TRETI MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI MOJŽÍSOVA 1:1'")
		expect(p.parse("TRETI MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETI MOJŽÍŠOVA 1:1'")
		expect(p.parse("TRETÍ MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ MOJZISOVA 1:1'")
		expect(p.parse("TRETÍ MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ MOJZIŠOVA 1:1'")
		expect(p.parse("TRETÍ MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ MOJZÍSOVA 1:1'")
		expect(p.parse("TRETÍ MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ MOJZÍŠOVA 1:1'")
		expect(p.parse("TRETÍ MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ MOJŽISOVA 1:1'")
		expect(p.parse("TRETÍ MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ MOJŽIŠOVA 1:1'")
		expect(p.parse("TRETÍ MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ MOJŽÍSOVA 1:1'")
		expect(p.parse("TRETÍ MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TRETÍ MOJŽÍŠOVA 1:1'")
		expect(p.parse("TŘETI MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI MOJZISOVA 1:1'")
		expect(p.parse("TŘETI MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI MOJZIŠOVA 1:1'")
		expect(p.parse("TŘETI MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI MOJZÍSOVA 1:1'")
		expect(p.parse("TŘETI MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI MOJZÍŠOVA 1:1'")
		expect(p.parse("TŘETI MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI MOJŽISOVA 1:1'")
		expect(p.parse("TŘETI MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI MOJŽIŠOVA 1:1'")
		expect(p.parse("TŘETI MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI MOJŽÍSOVA 1:1'")
		expect(p.parse("TŘETI MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETI MOJŽÍŠOVA 1:1'")
		expect(p.parse("TŘETÍ MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ MOJZISOVA 1:1'")
		expect(p.parse("TŘETÍ MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ MOJZIŠOVA 1:1'")
		expect(p.parse("TŘETÍ MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ MOJZÍSOVA 1:1'")
		expect(p.parse("TŘETÍ MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ MOJZÍŠOVA 1:1'")
		expect(p.parse("TŘETÍ MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ MOJŽISOVA 1:1'")
		expect(p.parse("TŘETÍ MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ MOJŽIŠOVA 1:1'")
		expect(p.parse("TŘETÍ MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ MOJŽÍSOVA 1:1'")
		expect(p.parse("TŘETÍ MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'TŘETÍ MOJŽÍŠOVA 1:1'")
		expect(p.parse("III. MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. MOJZISOVA 1:1'")
		expect(p.parse("III. MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. MOJZIŠOVA 1:1'")
		expect(p.parse("III. MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. MOJZÍSOVA 1:1'")
		expect(p.parse("III. MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. MOJZÍŠOVA 1:1'")
		expect(p.parse("III. MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. MOJŽISOVA 1:1'")
		expect(p.parse("III. MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. MOJŽIŠOVA 1:1'")
		expect(p.parse("III. MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. MOJŽÍSOVA 1:1'")
		expect(p.parse("III. MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. MOJŽÍŠOVA 1:1'")
		expect(p.parse("III MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III MOJZISOVA 1:1'")
		expect(p.parse("III MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III MOJZIŠOVA 1:1'")
		expect(p.parse("III MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III MOJZÍSOVA 1:1'")
		expect(p.parse("III MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III MOJZÍŠOVA 1:1'")
		expect(p.parse("III MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III MOJŽISOVA 1:1'")
		expect(p.parse("III MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III MOJŽIŠOVA 1:1'")
		expect(p.parse("III MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III MOJŽÍSOVA 1:1'")
		expect(p.parse("III MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III MOJŽÍŠOVA 1:1'")
		expect(p.parse("3. MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. MOJZISOVA 1:1'")
		expect(p.parse("3. MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. MOJZIŠOVA 1:1'")
		expect(p.parse("3. MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. MOJZÍSOVA 1:1'")
		expect(p.parse("3. MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. MOJZÍŠOVA 1:1'")
		expect(p.parse("3. MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. MOJŽISOVA 1:1'")
		expect(p.parse("3. MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. MOJŽIŠOVA 1:1'")
		expect(p.parse("3. MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. MOJŽÍSOVA 1:1'")
		expect(p.parse("3. MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. MOJŽÍŠOVA 1:1'")
		expect(p.parse("3 MOJZISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 MOJZISOVA 1:1'")
		expect(p.parse("3 MOJZIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 MOJZIŠOVA 1:1'")
		expect(p.parse("3 MOJZÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 MOJZÍSOVA 1:1'")
		expect(p.parse("3 MOJZÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 MOJZÍŠOVA 1:1'")
		expect(p.parse("3 MOJŽISOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 MOJŽISOVA 1:1'")
		expect(p.parse("3 MOJŽIŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 MOJŽIŠOVA 1:1'")
		expect(p.parse("3 MOJŽÍSOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 MOJŽÍSOVA 1:1'")
		expect(p.parse("3 MOJŽÍŠOVA 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 MOJŽÍŠOVA 1:1'")
		expect(p.parse("LEVITICUSI 1:1").osis()).toEqual("Lev.1.1", "parsing: 'LEVITICUSI 1:1'")
		expect(p.parse("LEVITICUS 1:1").osis()).toEqual("Lev.1.1", "parsing: 'LEVITICUS 1:1'")
		expect(p.parse("LEVITIKUS 1:1").osis()).toEqual("Lev.1.1", "parsing: 'LEVITIKUS 1:1'")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1", "parsing: 'LEV 1:1'")
		expect(p.parse("LV 1:1").osis()).toEqual("Lev.1.1", "parsing: 'LV 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Num (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Num (cs)", function() {
      
		expect(p.parse("Ctvrta kniha Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta kniha Mojzisova 1:1'")
		expect(p.parse("Ctvrta kniha Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta kniha Mojzišova 1:1'")
		expect(p.parse("Ctvrta kniha Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta kniha Mojzísova 1:1'")
		expect(p.parse("Ctvrta kniha Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta kniha Mojzíšova 1:1'")
		expect(p.parse("Ctvrta kniha Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta kniha Mojžisova 1:1'")
		expect(p.parse("Ctvrta kniha Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta kniha Mojžišova 1:1'")
		expect(p.parse("Ctvrta kniha Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta kniha Mojžísova 1:1'")
		expect(p.parse("Ctvrta kniha Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta kniha Mojžíšova 1:1'")
		expect(p.parse("Ctvrtá kniha Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá kniha Mojzisova 1:1'")
		expect(p.parse("Ctvrtá kniha Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá kniha Mojzišova 1:1'")
		expect(p.parse("Ctvrtá kniha Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá kniha Mojzísova 1:1'")
		expect(p.parse("Ctvrtá kniha Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá kniha Mojzíšova 1:1'")
		expect(p.parse("Ctvrtá kniha Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá kniha Mojžisova 1:1'")
		expect(p.parse("Ctvrtá kniha Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá kniha Mojžišova 1:1'")
		expect(p.parse("Ctvrtá kniha Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá kniha Mojžísova 1:1'")
		expect(p.parse("Ctvrtá kniha Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá kniha Mojžíšova 1:1'")
		expect(p.parse("Čtvrta kniha Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta kniha Mojzisova 1:1'")
		expect(p.parse("Čtvrta kniha Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta kniha Mojzišova 1:1'")
		expect(p.parse("Čtvrta kniha Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta kniha Mojzísova 1:1'")
		expect(p.parse("Čtvrta kniha Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta kniha Mojzíšova 1:1'")
		expect(p.parse("Čtvrta kniha Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta kniha Mojžisova 1:1'")
		expect(p.parse("Čtvrta kniha Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta kniha Mojžišova 1:1'")
		expect(p.parse("Čtvrta kniha Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta kniha Mojžísova 1:1'")
		expect(p.parse("Čtvrta kniha Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta kniha Mojžíšova 1:1'")
		expect(p.parse("Čtvrtá kniha Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá kniha Mojzisova 1:1'")
		expect(p.parse("Čtvrtá kniha Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá kniha Mojzišova 1:1'")
		expect(p.parse("Čtvrtá kniha Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá kniha Mojzísova 1:1'")
		expect(p.parse("Čtvrtá kniha Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá kniha Mojzíšova 1:1'")
		expect(p.parse("Čtvrtá kniha Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá kniha Mojžisova 1:1'")
		expect(p.parse("Čtvrtá kniha Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá kniha Mojžišova 1:1'")
		expect(p.parse("Čtvrtá kniha Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá kniha Mojžísova 1:1'")
		expect(p.parse("Čtvrtá kniha Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá kniha Mojžíšova 1:1'")
		expect(p.parse("IV. kniha Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. kniha Mojzisova 1:1'")
		expect(p.parse("IV. kniha Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. kniha Mojzišova 1:1'")
		expect(p.parse("IV. kniha Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. kniha Mojzísova 1:1'")
		expect(p.parse("IV. kniha Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. kniha Mojzíšova 1:1'")
		expect(p.parse("IV. kniha Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. kniha Mojžisova 1:1'")
		expect(p.parse("IV. kniha Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. kniha Mojžišova 1:1'")
		expect(p.parse("IV. kniha Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. kniha Mojžísova 1:1'")
		expect(p.parse("IV. kniha Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. kniha Mojžíšova 1:1'")
		expect(p.parse("4. kniha Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. kniha Mojzisova 1:1'")
		expect(p.parse("4. kniha Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. kniha Mojzišova 1:1'")
		expect(p.parse("4. kniha Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. kniha Mojzísova 1:1'")
		expect(p.parse("4. kniha Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. kniha Mojzíšova 1:1'")
		expect(p.parse("4. kniha Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. kniha Mojžisova 1:1'")
		expect(p.parse("4. kniha Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. kniha Mojžišova 1:1'")
		expect(p.parse("4. kniha Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. kniha Mojžísova 1:1'")
		expect(p.parse("4. kniha Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. kniha Mojžíšova 1:1'")
		expect(p.parse("IV kniha Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV kniha Mojzisova 1:1'")
		expect(p.parse("IV kniha Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV kniha Mojzišova 1:1'")
		expect(p.parse("IV kniha Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV kniha Mojzísova 1:1'")
		expect(p.parse("IV kniha Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV kniha Mojzíšova 1:1'")
		expect(p.parse("IV kniha Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV kniha Mojžisova 1:1'")
		expect(p.parse("IV kniha Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV kniha Mojžišova 1:1'")
		expect(p.parse("IV kniha Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV kniha Mojžísova 1:1'")
		expect(p.parse("IV kniha Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV kniha Mojžíšova 1:1'")
		expect(p.parse("4 kniha Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 kniha Mojzisova 1:1'")
		expect(p.parse("4 kniha Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 kniha Mojzišova 1:1'")
		expect(p.parse("4 kniha Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 kniha Mojzísova 1:1'")
		expect(p.parse("4 kniha Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 kniha Mojzíšova 1:1'")
		expect(p.parse("4 kniha Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 kniha Mojžisova 1:1'")
		expect(p.parse("4 kniha Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 kniha Mojžišova 1:1'")
		expect(p.parse("4 kniha Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 kniha Mojžísova 1:1'")
		expect(p.parse("4 kniha Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 kniha Mojžíšova 1:1'")
		expect(p.parse("Ctvrta Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta Mojzisova 1:1'")
		expect(p.parse("Ctvrta Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta Mojzišova 1:1'")
		expect(p.parse("Ctvrta Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta Mojzísova 1:1'")
		expect(p.parse("Ctvrta Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta Mojzíšova 1:1'")
		expect(p.parse("Ctvrta Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta Mojžisova 1:1'")
		expect(p.parse("Ctvrta Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta Mojžišova 1:1'")
		expect(p.parse("Ctvrta Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta Mojžísova 1:1'")
		expect(p.parse("Ctvrta Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrta Mojžíšova 1:1'")
		expect(p.parse("Ctvrtá Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá Mojzisova 1:1'")
		expect(p.parse("Ctvrtá Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá Mojzišova 1:1'")
		expect(p.parse("Ctvrtá Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá Mojzísova 1:1'")
		expect(p.parse("Ctvrtá Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá Mojzíšova 1:1'")
		expect(p.parse("Ctvrtá Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá Mojžisova 1:1'")
		expect(p.parse("Ctvrtá Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá Mojžišova 1:1'")
		expect(p.parse("Ctvrtá Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá Mojžísova 1:1'")
		expect(p.parse("Ctvrtá Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Ctvrtá Mojžíšova 1:1'")
		expect(p.parse("Čtvrta Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta Mojzisova 1:1'")
		expect(p.parse("Čtvrta Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta Mojzišova 1:1'")
		expect(p.parse("Čtvrta Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta Mojzísova 1:1'")
		expect(p.parse("Čtvrta Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta Mojzíšova 1:1'")
		expect(p.parse("Čtvrta Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta Mojžisova 1:1'")
		expect(p.parse("Čtvrta Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta Mojžišova 1:1'")
		expect(p.parse("Čtvrta Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta Mojžísova 1:1'")
		expect(p.parse("Čtvrta Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrta Mojžíšova 1:1'")
		expect(p.parse("Čtvrtá Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá Mojzisova 1:1'")
		expect(p.parse("Čtvrtá Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá Mojzišova 1:1'")
		expect(p.parse("Čtvrtá Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá Mojzísova 1:1'")
		expect(p.parse("Čtvrtá Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá Mojzíšova 1:1'")
		expect(p.parse("Čtvrtá Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá Mojžisova 1:1'")
		expect(p.parse("Čtvrtá Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá Mojžišova 1:1'")
		expect(p.parse("Čtvrtá Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá Mojžísova 1:1'")
		expect(p.parse("Čtvrtá Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'Čtvrtá Mojžíšova 1:1'")
		expect(p.parse("IV. Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. Mojzisova 1:1'")
		expect(p.parse("IV. Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. Mojzišova 1:1'")
		expect(p.parse("IV. Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. Mojzísova 1:1'")
		expect(p.parse("IV. Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. Mojzíšova 1:1'")
		expect(p.parse("IV. Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. Mojžisova 1:1'")
		expect(p.parse("IV. Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. Mojžišova 1:1'")
		expect(p.parse("IV. Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. Mojžísova 1:1'")
		expect(p.parse("IV. Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. Mojžíšova 1:1'")
		expect(p.parse("4. Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. Mojzisova 1:1'")
		expect(p.parse("4. Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. Mojzišova 1:1'")
		expect(p.parse("4. Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. Mojzísova 1:1'")
		expect(p.parse("4. Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. Mojzíšova 1:1'")
		expect(p.parse("4. Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. Mojžisova 1:1'")
		expect(p.parse("4. Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. Mojžišova 1:1'")
		expect(p.parse("4. Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. Mojžísova 1:1'")
		expect(p.parse("4. Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: '4. Mojžíšova 1:1'")
		expect(p.parse("IV Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV Mojzisova 1:1'")
		expect(p.parse("IV Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV Mojzišova 1:1'")
		expect(p.parse("IV Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV Mojzísova 1:1'")
		expect(p.parse("IV Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV Mojzíšova 1:1'")
		expect(p.parse("IV Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV Mojžisova 1:1'")
		expect(p.parse("IV Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV Mojžišova 1:1'")
		expect(p.parse("IV Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV Mojžísova 1:1'")
		expect(p.parse("IV Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV Mojžíšova 1:1'")
		expect(p.parse("4 Mojzisova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 Mojzisova 1:1'")
		expect(p.parse("4 Mojzišova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 Mojzišova 1:1'")
		expect(p.parse("4 Mojzísova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 Mojzísova 1:1'")
		expect(p.parse("4 Mojzíšova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 Mojzíšova 1:1'")
		expect(p.parse("4 Mojžisova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 Mojžisova 1:1'")
		expect(p.parse("4 Mojžišova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 Mojžišova 1:1'")
		expect(p.parse("4 Mojžísova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 Mojžísova 1:1'")
		expect(p.parse("4 Mojžíšova 1:1").osis()).toEqual("Num.1.1", "parsing: '4 Mojžíšova 1:1'")
		expect(p.parse("Numeri 1:1").osis()).toEqual("Num.1.1", "parsing: 'Numeri 1:1'")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1", "parsing: 'Num 1:1'")
		expect(p.parse("Nm 1:1").osis()).toEqual("Num.1.1", "parsing: 'Nm 1:1'")
		expect(p.parse("Nu 1:1").osis()).toEqual("Num.1.1", "parsing: 'Nu 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("CTVRTA KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA KNIHA MOJZISOVA 1:1'")
		expect(p.parse("CTVRTA KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("CTVRTA KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("CTVRTA KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("CTVRTA KNIHA MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("CTVRTA KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("CTVRTA KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("CTVRTA KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("CTVRTÁ KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ KNIHA MOJZISOVA 1:1'")
		expect(p.parse("CTVRTÁ KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("CTVRTÁ KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("CTVRTÁ KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("CTVRTÁ KNIHA MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("CTVRTÁ KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("CTVRTÁ KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("CTVRTÁ KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("ČTVRTA KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA KNIHA MOJZISOVA 1:1'")
		expect(p.parse("ČTVRTA KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("ČTVRTA KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("ČTVRTA KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("ČTVRTA KNIHA MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("ČTVRTA KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("ČTVRTA KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("ČTVRTA KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("ČTVRTÁ KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ KNIHA MOJZISOVA 1:1'")
		expect(p.parse("ČTVRTÁ KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("ČTVRTÁ KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("ČTVRTÁ KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("ČTVRTÁ KNIHA MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("ČTVRTÁ KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("ČTVRTÁ KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("ČTVRTÁ KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("IV. KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. KNIHA MOJZISOVA 1:1'")
		expect(p.parse("IV. KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("IV. KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("IV. KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("IV. KNIHA MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("IV. KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("IV. KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("IV. KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("4. KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. KNIHA MOJZISOVA 1:1'")
		expect(p.parse("4. KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("4. KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("4. KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("4. KNIHA MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("4. KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("4. KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("4. KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("IV KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV KNIHA MOJZISOVA 1:1'")
		expect(p.parse("IV KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("IV KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("IV KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("IV KNIHA MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("IV KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("IV KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("IV KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("4 KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 KNIHA MOJZISOVA 1:1'")
		expect(p.parse("4 KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("4 KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("4 KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("4 KNIHA MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("4 KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("4 KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("4 KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("CTVRTA MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA MOJZISOVA 1:1'")
		expect(p.parse("CTVRTA MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA MOJZIŠOVA 1:1'")
		expect(p.parse("CTVRTA MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA MOJZÍSOVA 1:1'")
		expect(p.parse("CTVRTA MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA MOJZÍŠOVA 1:1'")
		expect(p.parse("CTVRTA MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA MOJŽISOVA 1:1'")
		expect(p.parse("CTVRTA MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA MOJŽIŠOVA 1:1'")
		expect(p.parse("CTVRTA MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA MOJŽÍSOVA 1:1'")
		expect(p.parse("CTVRTA MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTA MOJŽÍŠOVA 1:1'")
		expect(p.parse("CTVRTÁ MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ MOJZISOVA 1:1'")
		expect(p.parse("CTVRTÁ MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ MOJZIŠOVA 1:1'")
		expect(p.parse("CTVRTÁ MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ MOJZÍSOVA 1:1'")
		expect(p.parse("CTVRTÁ MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ MOJZÍŠOVA 1:1'")
		expect(p.parse("CTVRTÁ MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ MOJŽISOVA 1:1'")
		expect(p.parse("CTVRTÁ MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ MOJŽIŠOVA 1:1'")
		expect(p.parse("CTVRTÁ MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ MOJŽÍSOVA 1:1'")
		expect(p.parse("CTVRTÁ MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'CTVRTÁ MOJŽÍŠOVA 1:1'")
		expect(p.parse("ČTVRTA MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA MOJZISOVA 1:1'")
		expect(p.parse("ČTVRTA MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA MOJZIŠOVA 1:1'")
		expect(p.parse("ČTVRTA MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA MOJZÍSOVA 1:1'")
		expect(p.parse("ČTVRTA MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA MOJZÍŠOVA 1:1'")
		expect(p.parse("ČTVRTA MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA MOJŽISOVA 1:1'")
		expect(p.parse("ČTVRTA MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA MOJŽIŠOVA 1:1'")
		expect(p.parse("ČTVRTA MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA MOJŽÍSOVA 1:1'")
		expect(p.parse("ČTVRTA MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTA MOJŽÍŠOVA 1:1'")
		expect(p.parse("ČTVRTÁ MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ MOJZISOVA 1:1'")
		expect(p.parse("ČTVRTÁ MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ MOJZIŠOVA 1:1'")
		expect(p.parse("ČTVRTÁ MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ MOJZÍSOVA 1:1'")
		expect(p.parse("ČTVRTÁ MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ MOJZÍŠOVA 1:1'")
		expect(p.parse("ČTVRTÁ MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ MOJŽISOVA 1:1'")
		expect(p.parse("ČTVRTÁ MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ MOJŽIŠOVA 1:1'")
		expect(p.parse("ČTVRTÁ MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ MOJŽÍSOVA 1:1'")
		expect(p.parse("ČTVRTÁ MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'ČTVRTÁ MOJŽÍŠOVA 1:1'")
		expect(p.parse("IV. MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. MOJZISOVA 1:1'")
		expect(p.parse("IV. MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. MOJZIŠOVA 1:1'")
		expect(p.parse("IV. MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. MOJZÍSOVA 1:1'")
		expect(p.parse("IV. MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. MOJZÍŠOVA 1:1'")
		expect(p.parse("IV. MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. MOJŽISOVA 1:1'")
		expect(p.parse("IV. MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. MOJŽIŠOVA 1:1'")
		expect(p.parse("IV. MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. MOJŽÍSOVA 1:1'")
		expect(p.parse("IV. MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. MOJŽÍŠOVA 1:1'")
		expect(p.parse("4. MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. MOJZISOVA 1:1'")
		expect(p.parse("4. MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. MOJZIŠOVA 1:1'")
		expect(p.parse("4. MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. MOJZÍSOVA 1:1'")
		expect(p.parse("4. MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. MOJZÍŠOVA 1:1'")
		expect(p.parse("4. MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. MOJŽISOVA 1:1'")
		expect(p.parse("4. MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. MOJŽIŠOVA 1:1'")
		expect(p.parse("4. MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. MOJŽÍSOVA 1:1'")
		expect(p.parse("4. MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4. MOJŽÍŠOVA 1:1'")
		expect(p.parse("IV MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV MOJZISOVA 1:1'")
		expect(p.parse("IV MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV MOJZIŠOVA 1:1'")
		expect(p.parse("IV MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV MOJZÍSOVA 1:1'")
		expect(p.parse("IV MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV MOJZÍŠOVA 1:1'")
		expect(p.parse("IV MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV MOJŽISOVA 1:1'")
		expect(p.parse("IV MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV MOJŽIŠOVA 1:1'")
		expect(p.parse("IV MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV MOJŽÍSOVA 1:1'")
		expect(p.parse("IV MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV MOJŽÍŠOVA 1:1'")
		expect(p.parse("4 MOJZISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 MOJZISOVA 1:1'")
		expect(p.parse("4 MOJZIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 MOJZIŠOVA 1:1'")
		expect(p.parse("4 MOJZÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 MOJZÍSOVA 1:1'")
		expect(p.parse("4 MOJZÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 MOJZÍŠOVA 1:1'")
		expect(p.parse("4 MOJŽISOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 MOJŽISOVA 1:1'")
		expect(p.parse("4 MOJŽIŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 MOJŽIŠOVA 1:1'")
		expect(p.parse("4 MOJŽÍSOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 MOJŽÍSOVA 1:1'")
		expect(p.parse("4 MOJŽÍŠOVA 1:1").osis()).toEqual("Num.1.1", "parsing: '4 MOJŽÍŠOVA 1:1'")
		expect(p.parse("NUMERI 1:1").osis()).toEqual("Num.1.1", "parsing: 'NUMERI 1:1'")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1", "parsing: 'NUM 1:1'")
		expect(p.parse("NM 1:1").osis()).toEqual("Num.1.1", "parsing: 'NM 1:1'")
		expect(p.parse("NU 1:1").osis()).toEqual("Num.1.1", "parsing: 'NU 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Sir (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sir (cs)", function() {
      
		expect(p.parse("Kniha Sirachovcova 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Kniha Sirachovcova 1:1'")
		expect(p.parse("Kniha Sírachovcova 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Kniha Sírachovcova 1:1'")
		expect(p.parse("Ecclesiasticus 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Ecclesiasticus 1:1'")
		expect(p.parse("Sirachovec 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Sirachovec 1:1'")
		expect(p.parse("Sírachovec 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Sírachovec 1:1'")
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Sir 1:1'")
		expect(p.parse("Sír 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Sír 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Wis (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Wis (cs)", function() {
      
		expect(p.parse("Moudrost Salomounova 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Moudrost Salomounova 1:1'")
		expect(p.parse("Moudrost Šalomounova 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Moudrost Šalomounova 1:1'")
		expect(p.parse("Kniha Moudrosti 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Kniha Moudrosti 1:1'")
		expect(p.parse("Kniha moudrosti 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Kniha moudrosti 1:1'")
		expect(p.parse("Kniha moudrostí 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Kniha moudrostí 1:1'")
		expect(p.parse("Moudrost 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Moudrost 1:1'")
		expect(p.parse("Mdr 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Mdr 1:1'")
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Wis 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Lam (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lam (cs)", function() {
      
		expect(p.parse("Plac Jeremiasuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremiasuv 1:1'")
		expect(p.parse("Plac Jeremiasův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremiasův 1:1'")
		expect(p.parse("Plac Jeremiašuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremiašuv 1:1'")
		expect(p.parse("Plac Jeremiašův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremiašův 1:1'")
		expect(p.parse("Plac Jeremiásuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremiásuv 1:1'")
		expect(p.parse("Plac Jeremiásův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremiásův 1:1'")
		expect(p.parse("Plac Jeremiášuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremiášuv 1:1'")
		expect(p.parse("Plac Jeremiášův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremiášův 1:1'")
		expect(p.parse("Plac Jeremjasuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremjasuv 1:1'")
		expect(p.parse("Plac Jeremjasův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremjasův 1:1'")
		expect(p.parse("Plac Jeremjašuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremjašuv 1:1'")
		expect(p.parse("Plac Jeremjašův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremjašův 1:1'")
		expect(p.parse("Plac Jeremjásuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremjásuv 1:1'")
		expect(p.parse("Plac Jeremjásův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremjásův 1:1'")
		expect(p.parse("Plac Jeremjášuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremjášuv 1:1'")
		expect(p.parse("Plac Jeremjášův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac Jeremjášův 1:1'")
		expect(p.parse("Plač Jeremiasuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremiasuv 1:1'")
		expect(p.parse("Plač Jeremiasův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremiasův 1:1'")
		expect(p.parse("Plač Jeremiašuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremiašuv 1:1'")
		expect(p.parse("Plač Jeremiašův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremiašův 1:1'")
		expect(p.parse("Plač Jeremiásuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremiásuv 1:1'")
		expect(p.parse("Plač Jeremiásův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremiásův 1:1'")
		expect(p.parse("Plač Jeremiášuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremiášuv 1:1'")
		expect(p.parse("Plač Jeremiášův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremiášův 1:1'")
		expect(p.parse("Plač Jeremjasuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremjasuv 1:1'")
		expect(p.parse("Plač Jeremjasův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremjasův 1:1'")
		expect(p.parse("Plač Jeremjašuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremjašuv 1:1'")
		expect(p.parse("Plač Jeremjašův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremjašův 1:1'")
		expect(p.parse("Plač Jeremjásuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremjásuv 1:1'")
		expect(p.parse("Plač Jeremjásův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremjásův 1:1'")
		expect(p.parse("Plač Jeremjášuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremjášuv 1:1'")
		expect(p.parse("Plač Jeremjášův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač Jeremjášův 1:1'")
		expect(p.parse("Plác Jeremiasuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremiasuv 1:1'")
		expect(p.parse("Plác Jeremiasův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremiasův 1:1'")
		expect(p.parse("Plác Jeremiašuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremiašuv 1:1'")
		expect(p.parse("Plác Jeremiašův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremiašův 1:1'")
		expect(p.parse("Plác Jeremiásuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremiásuv 1:1'")
		expect(p.parse("Plác Jeremiásův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremiásův 1:1'")
		expect(p.parse("Plác Jeremiášuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremiášuv 1:1'")
		expect(p.parse("Plác Jeremiášův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremiášův 1:1'")
		expect(p.parse("Plác Jeremjasuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremjasuv 1:1'")
		expect(p.parse("Plác Jeremjasův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremjasův 1:1'")
		expect(p.parse("Plác Jeremjašuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremjašuv 1:1'")
		expect(p.parse("Plác Jeremjašův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremjašův 1:1'")
		expect(p.parse("Plác Jeremjásuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremjásuv 1:1'")
		expect(p.parse("Plác Jeremjásův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremjásův 1:1'")
		expect(p.parse("Plác Jeremjášuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremjášuv 1:1'")
		expect(p.parse("Plác Jeremjášův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác Jeremjášův 1:1'")
		expect(p.parse("Pláč Jeremiasuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremiasuv 1:1'")
		expect(p.parse("Pláč Jeremiasův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremiasův 1:1'")
		expect(p.parse("Pláč Jeremiašuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremiašuv 1:1'")
		expect(p.parse("Pláč Jeremiašův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremiašův 1:1'")
		expect(p.parse("Pláč Jeremiásuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremiásuv 1:1'")
		expect(p.parse("Pláč Jeremiásův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremiásův 1:1'")
		expect(p.parse("Pláč Jeremiášuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremiášuv 1:1'")
		expect(p.parse("Pláč Jeremiášův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremiášův 1:1'")
		expect(p.parse("Pláč Jeremjasuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremjasuv 1:1'")
		expect(p.parse("Pláč Jeremjasův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremjasův 1:1'")
		expect(p.parse("Pláč Jeremjašuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremjašuv 1:1'")
		expect(p.parse("Pláč Jeremjašův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremjašův 1:1'")
		expect(p.parse("Pláč Jeremjásuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremjásuv 1:1'")
		expect(p.parse("Pláč Jeremjásův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremjásův 1:1'")
		expect(p.parse("Pláč Jeremjášuv 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremjášuv 1:1'")
		expect(p.parse("Pláč Jeremjášův 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč Jeremjášův 1:1'")
		expect(p.parse("Kniha narku 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Kniha narku 1:1'")
		expect(p.parse("Kniha narků 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Kniha narků 1:1'")
		expect(p.parse("Kniha nařku 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Kniha nařku 1:1'")
		expect(p.parse("Kniha nařků 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Kniha nařků 1:1'")
		expect(p.parse("Kniha nárku 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Kniha nárku 1:1'")
		expect(p.parse("Kniha nárků 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Kniha nárků 1:1'")
		expect(p.parse("Kniha nářku 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Kniha nářku 1:1'")
		expect(p.parse("Kniha nářků 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Kniha nářků 1:1'")
		expect(p.parse("Plac 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plac 1:1'")
		expect(p.parse("Plač 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plač 1:1'")
		expect(p.parse("Plác 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Plác 1:1'")
		expect(p.parse("Pláč 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pláč 1:1'")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Lam 1:1'")
		expect(p.parse("Pl 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Pl 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PLAC JEREMIASUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMIASUV 1:1'")
		expect(p.parse("PLAC JEREMIASŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMIASŮV 1:1'")
		expect(p.parse("PLAC JEREMIAŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMIAŠUV 1:1'")
		expect(p.parse("PLAC JEREMIAŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMIAŠŮV 1:1'")
		expect(p.parse("PLAC JEREMIÁSUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMIÁSUV 1:1'")
		expect(p.parse("PLAC JEREMIÁSŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMIÁSŮV 1:1'")
		expect(p.parse("PLAC JEREMIÁŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMIÁŠUV 1:1'")
		expect(p.parse("PLAC JEREMIÁŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMIÁŠŮV 1:1'")
		expect(p.parse("PLAC JEREMJASUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMJASUV 1:1'")
		expect(p.parse("PLAC JEREMJASŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMJASŮV 1:1'")
		expect(p.parse("PLAC JEREMJAŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMJAŠUV 1:1'")
		expect(p.parse("PLAC JEREMJAŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMJAŠŮV 1:1'")
		expect(p.parse("PLAC JEREMJÁSUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMJÁSUV 1:1'")
		expect(p.parse("PLAC JEREMJÁSŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMJÁSŮV 1:1'")
		expect(p.parse("PLAC JEREMJÁŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMJÁŠUV 1:1'")
		expect(p.parse("PLAC JEREMJÁŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC JEREMJÁŠŮV 1:1'")
		expect(p.parse("PLAČ JEREMIASUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMIASUV 1:1'")
		expect(p.parse("PLAČ JEREMIASŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMIASŮV 1:1'")
		expect(p.parse("PLAČ JEREMIAŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMIAŠUV 1:1'")
		expect(p.parse("PLAČ JEREMIAŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMIAŠŮV 1:1'")
		expect(p.parse("PLAČ JEREMIÁSUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMIÁSUV 1:1'")
		expect(p.parse("PLAČ JEREMIÁSŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMIÁSŮV 1:1'")
		expect(p.parse("PLAČ JEREMIÁŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMIÁŠUV 1:1'")
		expect(p.parse("PLAČ JEREMIÁŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMIÁŠŮV 1:1'")
		expect(p.parse("PLAČ JEREMJASUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMJASUV 1:1'")
		expect(p.parse("PLAČ JEREMJASŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMJASŮV 1:1'")
		expect(p.parse("PLAČ JEREMJAŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMJAŠUV 1:1'")
		expect(p.parse("PLAČ JEREMJAŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMJAŠŮV 1:1'")
		expect(p.parse("PLAČ JEREMJÁSUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMJÁSUV 1:1'")
		expect(p.parse("PLAČ JEREMJÁSŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMJÁSŮV 1:1'")
		expect(p.parse("PLAČ JEREMJÁŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMJÁŠUV 1:1'")
		expect(p.parse("PLAČ JEREMJÁŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ JEREMJÁŠŮV 1:1'")
		expect(p.parse("PLÁC JEREMIASUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMIASUV 1:1'")
		expect(p.parse("PLÁC JEREMIASŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMIASŮV 1:1'")
		expect(p.parse("PLÁC JEREMIAŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMIAŠUV 1:1'")
		expect(p.parse("PLÁC JEREMIAŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMIAŠŮV 1:1'")
		expect(p.parse("PLÁC JEREMIÁSUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMIÁSUV 1:1'")
		expect(p.parse("PLÁC JEREMIÁSŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMIÁSŮV 1:1'")
		expect(p.parse("PLÁC JEREMIÁŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMIÁŠUV 1:1'")
		expect(p.parse("PLÁC JEREMIÁŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMIÁŠŮV 1:1'")
		expect(p.parse("PLÁC JEREMJASUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMJASUV 1:1'")
		expect(p.parse("PLÁC JEREMJASŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMJASŮV 1:1'")
		expect(p.parse("PLÁC JEREMJAŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMJAŠUV 1:1'")
		expect(p.parse("PLÁC JEREMJAŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMJAŠŮV 1:1'")
		expect(p.parse("PLÁC JEREMJÁSUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMJÁSUV 1:1'")
		expect(p.parse("PLÁC JEREMJÁSŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMJÁSŮV 1:1'")
		expect(p.parse("PLÁC JEREMJÁŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMJÁŠUV 1:1'")
		expect(p.parse("PLÁC JEREMJÁŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC JEREMJÁŠŮV 1:1'")
		expect(p.parse("PLÁČ JEREMIASUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMIASUV 1:1'")
		expect(p.parse("PLÁČ JEREMIASŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMIASŮV 1:1'")
		expect(p.parse("PLÁČ JEREMIAŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMIAŠUV 1:1'")
		expect(p.parse("PLÁČ JEREMIAŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMIAŠŮV 1:1'")
		expect(p.parse("PLÁČ JEREMIÁSUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMIÁSUV 1:1'")
		expect(p.parse("PLÁČ JEREMIÁSŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMIÁSŮV 1:1'")
		expect(p.parse("PLÁČ JEREMIÁŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMIÁŠUV 1:1'")
		expect(p.parse("PLÁČ JEREMIÁŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMIÁŠŮV 1:1'")
		expect(p.parse("PLÁČ JEREMJASUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMJASUV 1:1'")
		expect(p.parse("PLÁČ JEREMJASŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMJASŮV 1:1'")
		expect(p.parse("PLÁČ JEREMJAŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMJAŠUV 1:1'")
		expect(p.parse("PLÁČ JEREMJAŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMJAŠŮV 1:1'")
		expect(p.parse("PLÁČ JEREMJÁSUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMJÁSUV 1:1'")
		expect(p.parse("PLÁČ JEREMJÁSŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMJÁSŮV 1:1'")
		expect(p.parse("PLÁČ JEREMJÁŠUV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMJÁŠUV 1:1'")
		expect(p.parse("PLÁČ JEREMJÁŠŮV 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ JEREMJÁŠŮV 1:1'")
		expect(p.parse("KNIHA NARKU 1:1").osis()).toEqual("Lam.1.1", "parsing: 'KNIHA NARKU 1:1'")
		expect(p.parse("KNIHA NARKŮ 1:1").osis()).toEqual("Lam.1.1", "parsing: 'KNIHA NARKŮ 1:1'")
		expect(p.parse("KNIHA NAŘKU 1:1").osis()).toEqual("Lam.1.1", "parsing: 'KNIHA NAŘKU 1:1'")
		expect(p.parse("KNIHA NAŘKŮ 1:1").osis()).toEqual("Lam.1.1", "parsing: 'KNIHA NAŘKŮ 1:1'")
		expect(p.parse("KNIHA NÁRKU 1:1").osis()).toEqual("Lam.1.1", "parsing: 'KNIHA NÁRKU 1:1'")
		expect(p.parse("KNIHA NÁRKŮ 1:1").osis()).toEqual("Lam.1.1", "parsing: 'KNIHA NÁRKŮ 1:1'")
		expect(p.parse("KNIHA NÁŘKU 1:1").osis()).toEqual("Lam.1.1", "parsing: 'KNIHA NÁŘKU 1:1'")
		expect(p.parse("KNIHA NÁŘKŮ 1:1").osis()).toEqual("Lam.1.1", "parsing: 'KNIHA NÁŘKŮ 1:1'")
		expect(p.parse("PLAC 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAC 1:1'")
		expect(p.parse("PLAČ 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLAČ 1:1'")
		expect(p.parse("PLÁC 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁC 1:1'")
		expect(p.parse("PLÁČ 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PLÁČ 1:1'")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1", "parsing: 'LAM 1:1'")
		expect(p.parse("PL 1:1").osis()).toEqual("Lam.1.1", "parsing: 'PL 1:1'")
		;
      return true;
    });
  });

  describe("Localized book EpJer (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: EpJer (cs)", function() {
      
		expect(p.parse("List Jeremjasuv 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'List Jeremjasuv 1:1'")
		expect(p.parse("List Jeremjasův 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'List Jeremjasův 1:1'")
		expect(p.parse("List Jeremjašuv 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'List Jeremjašuv 1:1'")
		expect(p.parse("List Jeremjašův 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'List Jeremjašův 1:1'")
		expect(p.parse("List Jeremjásuv 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'List Jeremjásuv 1:1'")
		expect(p.parse("List Jeremjásův 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'List Jeremjásův 1:1'")
		expect(p.parse("List Jeremjášuv 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'List Jeremjášuv 1:1'")
		expect(p.parse("List Jeremjášův 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'List Jeremjášův 1:1'")
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'EpJer 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Rev (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rev (cs)", function() {
      
		expect(p.parse("Zjeveni svateho Jana 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Zjeveni svateho Jana 1:1'")
		expect(p.parse("Zjeveni svatého Jana 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Zjeveni svatého Jana 1:1'")
		expect(p.parse("Zjeveni Janovo 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Zjeveni Janovo 1:1'")
		expect(p.parse("Zjevení Janovo 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Zjevení Janovo 1:1'")
		expect(p.parse("Kniha Zjeveni 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Kniha Zjeveni 1:1'")
		expect(p.parse("Kniha Zjevení 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Kniha Zjevení 1:1'")
		expect(p.parse("Apokalypsa 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Apokalypsa 1:1'")
		expect(p.parse("Zjeveni 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Zjeveni 1:1'")
		expect(p.parse("Zjevení 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Zjevení 1:1'")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Rev 1:1'")
		expect(p.parse("Zj 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Zj 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ZJEVENI SVATEHO JANA 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ZJEVENI SVATEHO JANA 1:1'")
		expect(p.parse("ZJEVENI SVATÉHO JANA 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ZJEVENI SVATÉHO JANA 1:1'")
		expect(p.parse("ZJEVENI JANOVO 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ZJEVENI JANOVO 1:1'")
		expect(p.parse("ZJEVENÍ JANOVO 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ZJEVENÍ JANOVO 1:1'")
		expect(p.parse("KNIHA ZJEVENI 1:1").osis()).toEqual("Rev.1.1", "parsing: 'KNIHA ZJEVENI 1:1'")
		expect(p.parse("KNIHA ZJEVENÍ 1:1").osis()).toEqual("Rev.1.1", "parsing: 'KNIHA ZJEVENÍ 1:1'")
		expect(p.parse("APOKALYPSA 1:1").osis()).toEqual("Rev.1.1", "parsing: 'APOKALYPSA 1:1'")
		expect(p.parse("ZJEVENI 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ZJEVENI 1:1'")
		expect(p.parse("ZJEVENÍ 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ZJEVENÍ 1:1'")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1", "parsing: 'REV 1:1'")
		expect(p.parse("ZJ 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ZJ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book PrMan (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrMan (cs)", function() {
      
		expect(p.parse("Modlitbu Manasse 1:1").osis()).toEqual("PrMan.1.1", "parsing: 'Modlitbu Manasse 1:1'")
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1", "parsing: 'PrMan 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Deut (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Deut (cs)", function() {
      
		expect(p.parse("Pata kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata kniha Mojzisova 1:1'")
		expect(p.parse("Pata kniha Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata kniha Mojzišova 1:1'")
		expect(p.parse("Pata kniha Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata kniha Mojzísova 1:1'")
		expect(p.parse("Pata kniha Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata kniha Mojzíšova 1:1'")
		expect(p.parse("Pata kniha Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata kniha Mojžisova 1:1'")
		expect(p.parse("Pata kniha Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata kniha Mojžišova 1:1'")
		expect(p.parse("Pata kniha Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata kniha Mojžísova 1:1'")
		expect(p.parse("Pata kniha Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata kniha Mojžíšova 1:1'")
		expect(p.parse("Patá kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá kniha Mojzisova 1:1'")
		expect(p.parse("Patá kniha Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá kniha Mojzišova 1:1'")
		expect(p.parse("Patá kniha Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá kniha Mojzísova 1:1'")
		expect(p.parse("Patá kniha Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá kniha Mojzíšova 1:1'")
		expect(p.parse("Patá kniha Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá kniha Mojžisova 1:1'")
		expect(p.parse("Patá kniha Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá kniha Mojžišova 1:1'")
		expect(p.parse("Patá kniha Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá kniha Mojžísova 1:1'")
		expect(p.parse("Patá kniha Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá kniha Mojžíšova 1:1'")
		expect(p.parse("Páta kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta kniha Mojzisova 1:1'")
		expect(p.parse("Páta kniha Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta kniha Mojzišova 1:1'")
		expect(p.parse("Páta kniha Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta kniha Mojzísova 1:1'")
		expect(p.parse("Páta kniha Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta kniha Mojzíšova 1:1'")
		expect(p.parse("Páta kniha Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta kniha Mojžisova 1:1'")
		expect(p.parse("Páta kniha Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta kniha Mojžišova 1:1'")
		expect(p.parse("Páta kniha Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta kniha Mojžísova 1:1'")
		expect(p.parse("Páta kniha Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta kniha Mojžíšova 1:1'")
		expect(p.parse("Pátá kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá kniha Mojzisova 1:1'")
		expect(p.parse("Pátá kniha Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá kniha Mojzišova 1:1'")
		expect(p.parse("Pátá kniha Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá kniha Mojzísova 1:1'")
		expect(p.parse("Pátá kniha Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá kniha Mojzíšova 1:1'")
		expect(p.parse("Pátá kniha Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá kniha Mojžisova 1:1'")
		expect(p.parse("Pátá kniha Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá kniha Mojžišova 1:1'")
		expect(p.parse("Pátá kniha Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá kniha Mojžísova 1:1'")
		expect(p.parse("Pátá kniha Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá kniha Mojžíšova 1:1'")
		expect(p.parse("5. kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. kniha Mojzisova 1:1'")
		expect(p.parse("5. kniha Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. kniha Mojzišova 1:1'")
		expect(p.parse("5. kniha Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. kniha Mojzísova 1:1'")
		expect(p.parse("5. kniha Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. kniha Mojzíšova 1:1'")
		expect(p.parse("5. kniha Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. kniha Mojžisova 1:1'")
		expect(p.parse("5. kniha Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. kniha Mojžišova 1:1'")
		expect(p.parse("5. kniha Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. kniha Mojžísova 1:1'")
		expect(p.parse("5. kniha Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. kniha Mojžíšova 1:1'")
		expect(p.parse("V. kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. kniha Mojzisova 1:1'")
		expect(p.parse("V. kniha Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. kniha Mojzišova 1:1'")
		expect(p.parse("V. kniha Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. kniha Mojzísova 1:1'")
		expect(p.parse("V. kniha Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. kniha Mojzíšova 1:1'")
		expect(p.parse("V. kniha Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. kniha Mojžisova 1:1'")
		expect(p.parse("V. kniha Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. kniha Mojžišova 1:1'")
		expect(p.parse("V. kniha Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. kniha Mojžísova 1:1'")
		expect(p.parse("V. kniha Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. kniha Mojžíšova 1:1'")
		expect(p.parse("5 kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 kniha Mojzisova 1:1'")
		expect(p.parse("5 kniha Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 kniha Mojzišova 1:1'")
		expect(p.parse("5 kniha Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 kniha Mojzísova 1:1'")
		expect(p.parse("5 kniha Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 kniha Mojzíšova 1:1'")
		expect(p.parse("5 kniha Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 kniha Mojžisova 1:1'")
		expect(p.parse("5 kniha Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 kniha Mojžišova 1:1'")
		expect(p.parse("5 kniha Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 kniha Mojžísova 1:1'")
		expect(p.parse("5 kniha Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 kniha Mojžíšova 1:1'")
		expect(p.parse("V kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V kniha Mojzisova 1:1'")
		expect(p.parse("V kniha Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V kniha Mojzišova 1:1'")
		expect(p.parse("V kniha Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V kniha Mojzísova 1:1'")
		expect(p.parse("V kniha Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V kniha Mojzíšova 1:1'")
		expect(p.parse("V kniha Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V kniha Mojžisova 1:1'")
		expect(p.parse("V kniha Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V kniha Mojžišova 1:1'")
		expect(p.parse("V kniha Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V kniha Mojžísova 1:1'")
		expect(p.parse("V kniha Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V kniha Mojžíšova 1:1'")
		expect(p.parse("Pata Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata Mojzisova 1:1'")
		expect(p.parse("Pata Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata Mojzišova 1:1'")
		expect(p.parse("Pata Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata Mojzísova 1:1'")
		expect(p.parse("Pata Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata Mojzíšova 1:1'")
		expect(p.parse("Pata Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata Mojžisova 1:1'")
		expect(p.parse("Pata Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata Mojžišova 1:1'")
		expect(p.parse("Pata Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata Mojžísova 1:1'")
		expect(p.parse("Pata Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pata Mojžíšova 1:1'")
		expect(p.parse("Patá Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá Mojzisova 1:1'")
		expect(p.parse("Patá Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá Mojzišova 1:1'")
		expect(p.parse("Patá Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá Mojzísova 1:1'")
		expect(p.parse("Patá Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá Mojzíšova 1:1'")
		expect(p.parse("Patá Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá Mojžisova 1:1'")
		expect(p.parse("Patá Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá Mojžišova 1:1'")
		expect(p.parse("Patá Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá Mojžísova 1:1'")
		expect(p.parse("Patá Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Patá Mojžíšova 1:1'")
		expect(p.parse("Páta Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta Mojzisova 1:1'")
		expect(p.parse("Páta Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta Mojzišova 1:1'")
		expect(p.parse("Páta Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta Mojzísova 1:1'")
		expect(p.parse("Páta Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta Mojzíšova 1:1'")
		expect(p.parse("Páta Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta Mojžisova 1:1'")
		expect(p.parse("Páta Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta Mojžišova 1:1'")
		expect(p.parse("Páta Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta Mojžísova 1:1'")
		expect(p.parse("Páta Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Páta Mojžíšova 1:1'")
		expect(p.parse("Pátá Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá Mojzisova 1:1'")
		expect(p.parse("Pátá Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá Mojzišova 1:1'")
		expect(p.parse("Pátá Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá Mojzísova 1:1'")
		expect(p.parse("Pátá Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá Mojzíšova 1:1'")
		expect(p.parse("Pátá Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá Mojžisova 1:1'")
		expect(p.parse("Pátá Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá Mojžišova 1:1'")
		expect(p.parse("Pátá Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá Mojžísova 1:1'")
		expect(p.parse("Pátá Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Pátá Mojžíšova 1:1'")
		expect(p.parse("Deuteronomium 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Deuteronomium 1:1'")
		expect(p.parse("5. Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. Mojzisova 1:1'")
		expect(p.parse("5. Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. Mojzišova 1:1'")
		expect(p.parse("5. Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. Mojzísova 1:1'")
		expect(p.parse("5. Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. Mojzíšova 1:1'")
		expect(p.parse("5. Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. Mojžisova 1:1'")
		expect(p.parse("5. Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. Mojžišova 1:1'")
		expect(p.parse("5. Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. Mojžísova 1:1'")
		expect(p.parse("5. Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. Mojžíšova 1:1'")
		expect(p.parse("V. Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. Mojzisova 1:1'")
		expect(p.parse("V. Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. Mojzišova 1:1'")
		expect(p.parse("V. Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. Mojzísova 1:1'")
		expect(p.parse("V. Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. Mojzíšova 1:1'")
		expect(p.parse("V. Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. Mojžisova 1:1'")
		expect(p.parse("V. Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. Mojžišova 1:1'")
		expect(p.parse("V. Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. Mojžísova 1:1'")
		expect(p.parse("V. Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. Mojžíšova 1:1'")
		expect(p.parse("5 Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 Mojzisova 1:1'")
		expect(p.parse("5 Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 Mojzišova 1:1'")
		expect(p.parse("5 Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 Mojzísova 1:1'")
		expect(p.parse("5 Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 Mojzíšova 1:1'")
		expect(p.parse("5 Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 Mojžisova 1:1'")
		expect(p.parse("5 Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 Mojžišova 1:1'")
		expect(p.parse("5 Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 Mojžísova 1:1'")
		expect(p.parse("5 Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 Mojžíšova 1:1'")
		expect(p.parse("V Mojzisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V Mojzisova 1:1'")
		expect(p.parse("V Mojzišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V Mojzišova 1:1'")
		expect(p.parse("V Mojzísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V Mojzísova 1:1'")
		expect(p.parse("V Mojzíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V Mojzíšova 1:1'")
		expect(p.parse("V Mojžisova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V Mojžisova 1:1'")
		expect(p.parse("V Mojžišova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V Mojžišova 1:1'")
		expect(p.parse("V Mojžísova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V Mojžísova 1:1'")
		expect(p.parse("V Mojžíšova 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V Mojžíšova 1:1'")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Deut 1:1'")
		expect(p.parse("Dt 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Dt 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PATA KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA KNIHA MOJZISOVA 1:1'")
		expect(p.parse("PATA KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("PATA KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("PATA KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("PATA KNIHA MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("PATA KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("PATA KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("PATA KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("PATÁ KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ KNIHA MOJZISOVA 1:1'")
		expect(p.parse("PATÁ KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("PATÁ KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("PATÁ KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("PATÁ KNIHA MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("PATÁ KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("PATÁ KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("PATÁ KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("PÁTA KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA KNIHA MOJZISOVA 1:1'")
		expect(p.parse("PÁTA KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("PÁTA KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("PÁTA KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("PÁTA KNIHA MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("PÁTA KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("PÁTA KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("PÁTA KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("PÁTÁ KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ KNIHA MOJZISOVA 1:1'")
		expect(p.parse("PÁTÁ KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("PÁTÁ KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("PÁTÁ KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("PÁTÁ KNIHA MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("PÁTÁ KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("PÁTÁ KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("PÁTÁ KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("5. KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. KNIHA MOJZISOVA 1:1'")
		expect(p.parse("5. KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("5. KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("5. KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("5. KNIHA MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("5. KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("5. KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("5. KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("V. KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. KNIHA MOJZISOVA 1:1'")
		expect(p.parse("V. KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("V. KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("V. KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("V. KNIHA MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("V. KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("V. KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("V. KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("5 KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 KNIHA MOJZISOVA 1:1'")
		expect(p.parse("5 KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("5 KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("5 KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("5 KNIHA MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("5 KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("5 KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("5 KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("V KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V KNIHA MOJZISOVA 1:1'")
		expect(p.parse("V KNIHA MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V KNIHA MOJZIŠOVA 1:1'")
		expect(p.parse("V KNIHA MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V KNIHA MOJZÍSOVA 1:1'")
		expect(p.parse("V KNIHA MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V KNIHA MOJZÍŠOVA 1:1'")
		expect(p.parse("V KNIHA MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V KNIHA MOJŽISOVA 1:1'")
		expect(p.parse("V KNIHA MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V KNIHA MOJŽIŠOVA 1:1'")
		expect(p.parse("V KNIHA MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V KNIHA MOJŽÍSOVA 1:1'")
		expect(p.parse("V KNIHA MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V KNIHA MOJŽÍŠOVA 1:1'")
		expect(p.parse("PATA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA MOJZISOVA 1:1'")
		expect(p.parse("PATA MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA MOJZIŠOVA 1:1'")
		expect(p.parse("PATA MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA MOJZÍSOVA 1:1'")
		expect(p.parse("PATA MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA MOJZÍŠOVA 1:1'")
		expect(p.parse("PATA MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA MOJŽISOVA 1:1'")
		expect(p.parse("PATA MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA MOJŽIŠOVA 1:1'")
		expect(p.parse("PATA MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA MOJŽÍSOVA 1:1'")
		expect(p.parse("PATA MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATA MOJŽÍŠOVA 1:1'")
		expect(p.parse("PATÁ MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ MOJZISOVA 1:1'")
		expect(p.parse("PATÁ MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ MOJZIŠOVA 1:1'")
		expect(p.parse("PATÁ MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ MOJZÍSOVA 1:1'")
		expect(p.parse("PATÁ MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ MOJZÍŠOVA 1:1'")
		expect(p.parse("PATÁ MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ MOJŽISOVA 1:1'")
		expect(p.parse("PATÁ MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ MOJŽIŠOVA 1:1'")
		expect(p.parse("PATÁ MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ MOJŽÍSOVA 1:1'")
		expect(p.parse("PATÁ MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PATÁ MOJŽÍŠOVA 1:1'")
		expect(p.parse("PÁTA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA MOJZISOVA 1:1'")
		expect(p.parse("PÁTA MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA MOJZIŠOVA 1:1'")
		expect(p.parse("PÁTA MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA MOJZÍSOVA 1:1'")
		expect(p.parse("PÁTA MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA MOJZÍŠOVA 1:1'")
		expect(p.parse("PÁTA MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA MOJŽISOVA 1:1'")
		expect(p.parse("PÁTA MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA MOJŽIŠOVA 1:1'")
		expect(p.parse("PÁTA MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA MOJŽÍSOVA 1:1'")
		expect(p.parse("PÁTA MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTA MOJŽÍŠOVA 1:1'")
		expect(p.parse("PÁTÁ MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ MOJZISOVA 1:1'")
		expect(p.parse("PÁTÁ MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ MOJZIŠOVA 1:1'")
		expect(p.parse("PÁTÁ MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ MOJZÍSOVA 1:1'")
		expect(p.parse("PÁTÁ MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ MOJZÍŠOVA 1:1'")
		expect(p.parse("PÁTÁ MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ MOJŽISOVA 1:1'")
		expect(p.parse("PÁTÁ MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ MOJŽIŠOVA 1:1'")
		expect(p.parse("PÁTÁ MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ MOJŽÍSOVA 1:1'")
		expect(p.parse("PÁTÁ MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'PÁTÁ MOJŽÍŠOVA 1:1'")
		expect(p.parse("DEUTERONOMIUM 1:1").osis()).toEqual("Deut.1.1", "parsing: 'DEUTERONOMIUM 1:1'")
		expect(p.parse("5. MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. MOJZISOVA 1:1'")
		expect(p.parse("5. MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. MOJZIŠOVA 1:1'")
		expect(p.parse("5. MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. MOJZÍSOVA 1:1'")
		expect(p.parse("5. MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. MOJZÍŠOVA 1:1'")
		expect(p.parse("5. MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. MOJŽISOVA 1:1'")
		expect(p.parse("5. MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. MOJŽIŠOVA 1:1'")
		expect(p.parse("5. MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. MOJŽÍSOVA 1:1'")
		expect(p.parse("5. MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. MOJŽÍŠOVA 1:1'")
		expect(p.parse("V. MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. MOJZISOVA 1:1'")
		expect(p.parse("V. MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. MOJZIŠOVA 1:1'")
		expect(p.parse("V. MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. MOJZÍSOVA 1:1'")
		expect(p.parse("V. MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. MOJZÍŠOVA 1:1'")
		expect(p.parse("V. MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. MOJŽISOVA 1:1'")
		expect(p.parse("V. MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. MOJŽIŠOVA 1:1'")
		expect(p.parse("V. MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. MOJŽÍSOVA 1:1'")
		expect(p.parse("V. MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. MOJŽÍŠOVA 1:1'")
		expect(p.parse("5 MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 MOJZISOVA 1:1'")
		expect(p.parse("5 MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 MOJZIŠOVA 1:1'")
		expect(p.parse("5 MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 MOJZÍSOVA 1:1'")
		expect(p.parse("5 MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 MOJZÍŠOVA 1:1'")
		expect(p.parse("5 MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 MOJŽISOVA 1:1'")
		expect(p.parse("5 MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 MOJŽIŠOVA 1:1'")
		expect(p.parse("5 MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 MOJŽÍSOVA 1:1'")
		expect(p.parse("5 MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 MOJŽÍŠOVA 1:1'")
		expect(p.parse("V MOJZISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V MOJZISOVA 1:1'")
		expect(p.parse("V MOJZIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V MOJZIŠOVA 1:1'")
		expect(p.parse("V MOJZÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V MOJZÍSOVA 1:1'")
		expect(p.parse("V MOJZÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V MOJZÍŠOVA 1:1'")
		expect(p.parse("V MOJŽISOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V MOJŽISOVA 1:1'")
		expect(p.parse("V MOJŽIŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V MOJŽIŠOVA 1:1'")
		expect(p.parse("V MOJŽÍSOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V MOJŽÍSOVA 1:1'")
		expect(p.parse("V MOJŽÍŠOVA 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V MOJŽÍŠOVA 1:1'")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1", "parsing: 'DEUT 1:1'")
		expect(p.parse("DT 1:1").osis()).toEqual("Deut.1.1", "parsing: 'DT 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Josh (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Josh (cs)", function() {
      
		expect(p.parse("Jozue 1:1").osis()).toEqual("Josh.1.1", "parsing: 'Jozue 1:1'")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1", "parsing: 'Josh 1:1'")
		expect(p.parse("Joz 1:1").osis()).toEqual("Josh.1.1", "parsing: 'Joz 1:1'")
		expect(p.parse("Jz 1:1").osis()).toEqual("Josh.1.1", "parsing: 'Jz 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JOZUE 1:1").osis()).toEqual("Josh.1.1", "parsing: 'JOZUE 1:1'")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1", "parsing: 'JOSH 1:1'")
		expect(p.parse("JOZ 1:1").osis()).toEqual("Josh.1.1", "parsing: 'JOZ 1:1'")
		expect(p.parse("JZ 1:1").osis()).toEqual("Josh.1.1", "parsing: 'JZ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Judg (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Judg (cs)", function() {
      
		expect(p.parse("Soudcu 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Soudcu 1:1'")
		expect(p.parse("Soudců 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Soudců 1:1'")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Judg 1:1'")
		expect(p.parse("Sdc 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Sdc 1:1'")
		expect(p.parse("Sd 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Sd 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("SOUDCU 1:1").osis()).toEqual("Judg.1.1", "parsing: 'SOUDCU 1:1'")
		expect(p.parse("SOUDCŮ 1:1").osis()).toEqual("Judg.1.1", "parsing: 'SOUDCŮ 1:1'")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1", "parsing: 'JUDG 1:1'")
		expect(p.parse("SDC 1:1").osis()).toEqual("Judg.1.1", "parsing: 'SDC 1:1'")
		expect(p.parse("SD 1:1").osis()).toEqual("Judg.1.1", "parsing: 'SD 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ruth (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ruth (cs)", function() {
      
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'Ruth 1:1'")
		expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'Rut 1:1'")
		expect(p.parse("Rút 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'Rút 1:1'")
		expect(p.parse("Rt 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'Rt 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'RUTH 1:1'")
		expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'RUT 1:1'")
		expect(p.parse("RÚT 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'RÚT 1:1'")
		expect(p.parse("RT 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'RT 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Esd (cs)", function() {
      
		expect(p.parse("Prvni Ezdras 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'Prvni Ezdras 1:1'")
		expect(p.parse("Prvni Ezdraš 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'Prvni Ezdraš 1:1'")
		expect(p.parse("Prvni Ezdrás 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'Prvni Ezdrás 1:1'")
		expect(p.parse("Prvni Ezdráš 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'Prvni Ezdráš 1:1'")
		expect(p.parse("První Ezdras 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'První Ezdras 1:1'")
		expect(p.parse("První Ezdraš 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'První Ezdraš 1:1'")
		expect(p.parse("První Ezdrás 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'První Ezdrás 1:1'")
		expect(p.parse("První Ezdráš 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'První Ezdráš 1:1'")
		expect(p.parse("1. Ezdras 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1. Ezdras 1:1'")
		expect(p.parse("1. Ezdraš 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1. Ezdraš 1:1'")
		expect(p.parse("1. Ezdrás 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1. Ezdrás 1:1'")
		expect(p.parse("1. Ezdráš 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1. Ezdráš 1:1'")
		expect(p.parse("I. Ezdras 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I. Ezdras 1:1'")
		expect(p.parse("I. Ezdraš 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I. Ezdraš 1:1'")
		expect(p.parse("I. Ezdrás 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I. Ezdrás 1:1'")
		expect(p.parse("I. Ezdráš 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I. Ezdráš 1:1'")
		expect(p.parse("1 Ezdras 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1 Ezdras 1:1'")
		expect(p.parse("1 Ezdraš 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1 Ezdraš 1:1'")
		expect(p.parse("1 Ezdrás 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1 Ezdrás 1:1'")
		expect(p.parse("1 Ezdráš 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1 Ezdráš 1:1'")
		expect(p.parse("I Ezdras 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I Ezdras 1:1'")
		expect(p.parse("I Ezdraš 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I Ezdraš 1:1'")
		expect(p.parse("I Ezdrás 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I Ezdrás 1:1'")
		expect(p.parse("I Ezdráš 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I Ezdráš 1:1'")
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1Esd 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Esd (cs)", function() {
      
		expect(p.parse("Druha Ezdras 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druha Ezdras 1:1'")
		expect(p.parse("Druha Ezdraš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druha Ezdraš 1:1'")
		expect(p.parse("Druha Ezdrás 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druha Ezdrás 1:1'")
		expect(p.parse("Druha Ezdráš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druha Ezdráš 1:1'")
		expect(p.parse("Druhy Ezdras 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhy Ezdras 1:1'")
		expect(p.parse("Druhy Ezdraš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhy Ezdraš 1:1'")
		expect(p.parse("Druhy Ezdrás 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhy Ezdrás 1:1'")
		expect(p.parse("Druhy Ezdráš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhy Ezdráš 1:1'")
		expect(p.parse("Druhá Ezdras 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhá Ezdras 1:1'")
		expect(p.parse("Druhá Ezdraš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhá Ezdraš 1:1'")
		expect(p.parse("Druhá Ezdrás 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhá Ezdrás 1:1'")
		expect(p.parse("Druhá Ezdráš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhá Ezdráš 1:1'")
		expect(p.parse("Druhý Ezdras 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhý Ezdras 1:1'")
		expect(p.parse("Druhý Ezdraš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhý Ezdraš 1:1'")
		expect(p.parse("Druhý Ezdrás 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhý Ezdrás 1:1'")
		expect(p.parse("Druhý Ezdráš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Druhý Ezdráš 1:1'")
		expect(p.parse("II. Ezdras 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II. Ezdras 1:1'")
		expect(p.parse("II. Ezdraš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II. Ezdraš 1:1'")
		expect(p.parse("II. Ezdrás 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II. Ezdrás 1:1'")
		expect(p.parse("II. Ezdráš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II. Ezdráš 1:1'")
		expect(p.parse("2. Ezdras 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2. Ezdras 1:1'")
		expect(p.parse("2. Ezdraš 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2. Ezdraš 1:1'")
		expect(p.parse("2. Ezdrás 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2. Ezdrás 1:1'")
		expect(p.parse("2. Ezdráš 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2. Ezdráš 1:1'")
		expect(p.parse("II Ezdras 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II Ezdras 1:1'")
		expect(p.parse("II Ezdraš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II Ezdraš 1:1'")
		expect(p.parse("II Ezdrás 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II Ezdrás 1:1'")
		expect(p.parse("II Ezdráš 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II Ezdráš 1:1'")
		expect(p.parse("2 Ezdras 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2 Ezdras 1:1'")
		expect(p.parse("2 Ezdraš 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2 Ezdraš 1:1'")
		expect(p.parse("2 Ezdrás 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2 Ezdrás 1:1'")
		expect(p.parse("2 Ezdráš 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2 Ezdráš 1:1'")
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2Esd 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Isa (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Isa (cs)", function() {
      
		expect(p.parse("Izaias 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Izaias 1:1'")
		expect(p.parse("Izaiaš 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Izaiaš 1:1'")
		expect(p.parse("Izaiás 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Izaiás 1:1'")
		expect(p.parse("Izaiáš 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Izaiáš 1:1'")
		expect(p.parse("Izajas 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Izajas 1:1'")
		expect(p.parse("Izajaš 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Izajaš 1:1'")
		expect(p.parse("Izajás 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Izajás 1:1'")
		expect(p.parse("Izajáš 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Izajáš 1:1'")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Isa 1:1'")
		expect(p.parse("Is 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Is 1:1'")
		expect(p.parse("Iz 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Iz 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("IZAIAS 1:1").osis()).toEqual("Isa.1.1", "parsing: 'IZAIAS 1:1'")
		expect(p.parse("IZAIAŠ 1:1").osis()).toEqual("Isa.1.1", "parsing: 'IZAIAŠ 1:1'")
		expect(p.parse("IZAIÁS 1:1").osis()).toEqual("Isa.1.1", "parsing: 'IZAIÁS 1:1'")
		expect(p.parse("IZAIÁŠ 1:1").osis()).toEqual("Isa.1.1", "parsing: 'IZAIÁŠ 1:1'")
		expect(p.parse("IZAJAS 1:1").osis()).toEqual("Isa.1.1", "parsing: 'IZAJAS 1:1'")
		expect(p.parse("IZAJAŠ 1:1").osis()).toEqual("Isa.1.1", "parsing: 'IZAJAŠ 1:1'")
		expect(p.parse("IZAJÁS 1:1").osis()).toEqual("Isa.1.1", "parsing: 'IZAJÁS 1:1'")
		expect(p.parse("IZAJÁŠ 1:1").osis()).toEqual("Isa.1.1", "parsing: 'IZAJÁŠ 1:1'")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1", "parsing: 'ISA 1:1'")
		expect(p.parse("IS 1:1").osis()).toEqual("Isa.1.1", "parsing: 'IS 1:1'")
		expect(p.parse("IZ 1:1").osis()).toEqual("Isa.1.1", "parsing: 'IZ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Sam (cs)", function() {
      
		expect(p.parse("Druha kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druha kniha Samuelova 1:1'")
		expect(p.parse("Druhy kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhy kniha Samuelova 1:1'")
		expect(p.parse("Druhá kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhá kniha Samuelova 1:1'")
		expect(p.parse("Druhý kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhý kniha Samuelova 1:1'")
		expect(p.parse("II. kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. kniha Samuelova 1:1'")
		expect(p.parse("2. kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. kniha Samuelova 1:1'")
		expect(p.parse("II kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II kniha Samuelova 1:1'")
		expect(p.parse("2 kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 kniha Samuelova 1:1'")
		expect(p.parse("Druha Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druha Samuelova 1:1'")
		expect(p.parse("Druhy Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhy Samuelova 1:1'")
		expect(p.parse("Druhá Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhá Samuelova 1:1'")
		expect(p.parse("Druhý Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhý Samuelova 1:1'")
		expect(p.parse("II. Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. Samuelova 1:1'")
		expect(p.parse("2. Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. Samuelova 1:1'")
		expect(p.parse("Druha Samuel 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druha Samuel 1:1'")
		expect(p.parse("Druhy Samuel 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhy Samuel 1:1'")
		expect(p.parse("Druhá Samuel 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhá Samuel 1:1'")
		expect(p.parse("Druhý Samuel 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhý Samuel 1:1'")
		expect(p.parse("II Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II Samuelova 1:1'")
		expect(p.parse("2 Samuelova 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 Samuelova 1:1'")
		expect(p.parse("II. Samuel 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. Samuel 1:1'")
		expect(p.parse("2. Samuel 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. Samuel 1:1'")
		expect(p.parse("Druha Sam 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druha Sam 1:1'")
		expect(p.parse("Druhy Sam 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhy Sam 1:1'")
		expect(p.parse("Druhá Sam 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhá Sam 1:1'")
		expect(p.parse("Druhý Sam 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhý Sam 1:1'")
		expect(p.parse("II Samuel 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II Samuel 1:1'")
		expect(p.parse("2 Samuel 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 Samuel 1:1'")
		expect(p.parse("Druha S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druha S 1:1'")
		expect(p.parse("Druhy S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhy S 1:1'")
		expect(p.parse("Druhá S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhá S 1:1'")
		expect(p.parse("Druhý S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Druhý S 1:1'")
		expect(p.parse("II. Sam 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. Sam 1:1'")
		expect(p.parse("2. Sam 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. Sam 1:1'")
		expect(p.parse("II Sam 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II Sam 1:1'")
		expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 Sam 1:1'")
		expect(p.parse("II. S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. S 1:1'")
		expect(p.parse("2. S 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. S 1:1'")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2Sam 1:1'")
		expect(p.parse("II S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II S 1:1'")
		expect(p.parse("2 S 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 S 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("DRUHA KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHA KNIHA SAMUELOVA 1:1'")
		expect(p.parse("DRUHY KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHY KNIHA SAMUELOVA 1:1'")
		expect(p.parse("DRUHÁ KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHÁ KNIHA SAMUELOVA 1:1'")
		expect(p.parse("DRUHÝ KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHÝ KNIHA SAMUELOVA 1:1'")
		expect(p.parse("II. KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. KNIHA SAMUELOVA 1:1'")
		expect(p.parse("2. KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. KNIHA SAMUELOVA 1:1'")
		expect(p.parse("II KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II KNIHA SAMUELOVA 1:1'")
		expect(p.parse("2 KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 KNIHA SAMUELOVA 1:1'")
		expect(p.parse("DRUHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHA SAMUELOVA 1:1'")
		expect(p.parse("DRUHY SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHY SAMUELOVA 1:1'")
		expect(p.parse("DRUHÁ SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHÁ SAMUELOVA 1:1'")
		expect(p.parse("DRUHÝ SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHÝ SAMUELOVA 1:1'")
		expect(p.parse("II. SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. SAMUELOVA 1:1'")
		expect(p.parse("2. SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. SAMUELOVA 1:1'")
		expect(p.parse("DRUHA SAMUEL 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHA SAMUEL 1:1'")
		expect(p.parse("DRUHY SAMUEL 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHY SAMUEL 1:1'")
		expect(p.parse("DRUHÁ SAMUEL 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHÁ SAMUEL 1:1'")
		expect(p.parse("DRUHÝ SAMUEL 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHÝ SAMUEL 1:1'")
		expect(p.parse("II SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II SAMUELOVA 1:1'")
		expect(p.parse("2 SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 SAMUELOVA 1:1'")
		expect(p.parse("II. SAMUEL 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. SAMUEL 1:1'")
		expect(p.parse("2. SAMUEL 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. SAMUEL 1:1'")
		expect(p.parse("DRUHA SAM 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHA SAM 1:1'")
		expect(p.parse("DRUHY SAM 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHY SAM 1:1'")
		expect(p.parse("DRUHÁ SAM 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHÁ SAM 1:1'")
		expect(p.parse("DRUHÝ SAM 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHÝ SAM 1:1'")
		expect(p.parse("II SAMUEL 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II SAMUEL 1:1'")
		expect(p.parse("2 SAMUEL 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 SAMUEL 1:1'")
		expect(p.parse("DRUHA S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHA S 1:1'")
		expect(p.parse("DRUHY S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHY S 1:1'")
		expect(p.parse("DRUHÁ S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHÁ S 1:1'")
		expect(p.parse("DRUHÝ S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'DRUHÝ S 1:1'")
		expect(p.parse("II. SAM 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. SAM 1:1'")
		expect(p.parse("2. SAM 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. SAM 1:1'")
		expect(p.parse("II SAM 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II SAM 1:1'")
		expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 SAM 1:1'")
		expect(p.parse("II. S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. S 1:1'")
		expect(p.parse("2. S 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. S 1:1'")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2SAM 1:1'")
		expect(p.parse("II S 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II S 1:1'")
		expect(p.parse("2 S 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 S 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Sam (cs)", function() {
      
		expect(p.parse("Prvni kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Prvni kniha Samuelova 1:1'")
		expect(p.parse("První kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'První kniha Samuelova 1:1'")
		expect(p.parse("1. kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. kniha Samuelova 1:1'")
		expect(p.parse("I. kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. kniha Samuelova 1:1'")
		expect(p.parse("1 kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 kniha Samuelova 1:1'")
		expect(p.parse("I kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I kniha Samuelova 1:1'")
		expect(p.parse("Prvni Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Prvni Samuelova 1:1'")
		expect(p.parse("První Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'První Samuelova 1:1'")
		expect(p.parse("1. Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. Samuelova 1:1'")
		expect(p.parse("I. Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. Samuelova 1:1'")
		expect(p.parse("Prvni Samuel 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Prvni Samuel 1:1'")
		expect(p.parse("První Samuel 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'První Samuel 1:1'")
		expect(p.parse("1 Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 Samuelova 1:1'")
		expect(p.parse("I Samuelova 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I Samuelova 1:1'")
		expect(p.parse("1. Samuel 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. Samuel 1:1'")
		expect(p.parse("I. Samuel 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. Samuel 1:1'")
		expect(p.parse("Prvni Sam 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Prvni Sam 1:1'")
		expect(p.parse("První Sam 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'První Sam 1:1'")
		expect(p.parse("1 Samuel 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 Samuel 1:1'")
		expect(p.parse("I Samuel 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I Samuel 1:1'")
		expect(p.parse("Prvni S 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Prvni S 1:1'")
		expect(p.parse("První S 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'První S 1:1'")
		expect(p.parse("1. Sam 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. Sam 1:1'")
		expect(p.parse("I. Sam 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. Sam 1:1'")
		expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 Sam 1:1'")
		expect(p.parse("I Sam 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I Sam 1:1'")
		expect(p.parse("1. S 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. S 1:1'")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1Sam 1:1'")
		expect(p.parse("I. S 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. S 1:1'")
		expect(p.parse("1 S 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 S 1:1'")
		expect(p.parse("I S 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I S 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PRVNI KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'PRVNI KNIHA SAMUELOVA 1:1'")
		expect(p.parse("PRVNÍ KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'PRVNÍ KNIHA SAMUELOVA 1:1'")
		expect(p.parse("1. KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. KNIHA SAMUELOVA 1:1'")
		expect(p.parse("I. KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. KNIHA SAMUELOVA 1:1'")
		expect(p.parse("1 KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 KNIHA SAMUELOVA 1:1'")
		expect(p.parse("I KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I KNIHA SAMUELOVA 1:1'")
		expect(p.parse("PRVNI SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'PRVNI SAMUELOVA 1:1'")
		expect(p.parse("PRVNÍ SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'PRVNÍ SAMUELOVA 1:1'")
		expect(p.parse("1. SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. SAMUELOVA 1:1'")
		expect(p.parse("I. SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. SAMUELOVA 1:1'")
		expect(p.parse("PRVNI SAMUEL 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'PRVNI SAMUEL 1:1'")
		expect(p.parse("PRVNÍ SAMUEL 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'PRVNÍ SAMUEL 1:1'")
		expect(p.parse("1 SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 SAMUELOVA 1:1'")
		expect(p.parse("I SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I SAMUELOVA 1:1'")
		expect(p.parse("1. SAMUEL 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. SAMUEL 1:1'")
		expect(p.parse("I. SAMUEL 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. SAMUEL 1:1'")
		expect(p.parse("PRVNI SAM 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'PRVNI SAM 1:1'")
		expect(p.parse("PRVNÍ SAM 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'PRVNÍ SAM 1:1'")
		expect(p.parse("1 SAMUEL 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 SAMUEL 1:1'")
		expect(p.parse("I SAMUEL 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I SAMUEL 1:1'")
		expect(p.parse("PRVNI S 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'PRVNI S 1:1'")
		expect(p.parse("PRVNÍ S 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'PRVNÍ S 1:1'")
		expect(p.parse("1. SAM 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. SAM 1:1'")
		expect(p.parse("I. SAM 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. SAM 1:1'")
		expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 SAM 1:1'")
		expect(p.parse("I SAM 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I SAM 1:1'")
		expect(p.parse("1. S 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. S 1:1'")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1SAM 1:1'")
		expect(p.parse("I. S 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. S 1:1'")
		expect(p.parse("1 S 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 S 1:1'")
		expect(p.parse("I S 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I S 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Kgs (cs)", function() {
      
		expect(p.parse("Druha kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druha kniha kralovska 1:1'")
		expect(p.parse("Druha kniha kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druha kniha kralovská 1:1'")
		expect(p.parse("Druha kniha královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druha kniha královska 1:1'")
		expect(p.parse("Druha kniha královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druha kniha královská 1:1'")
		expect(p.parse("Druhy kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhy kniha kralovska 1:1'")
		expect(p.parse("Druhy kniha kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhy kniha kralovská 1:1'")
		expect(p.parse("Druhy kniha královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhy kniha královska 1:1'")
		expect(p.parse("Druhy kniha královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhy kniha královská 1:1'")
		expect(p.parse("Druhá kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhá kniha kralovska 1:1'")
		expect(p.parse("Druhá kniha kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhá kniha kralovská 1:1'")
		expect(p.parse("Druhá kniha královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhá kniha královska 1:1'")
		expect(p.parse("Druhá kniha královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhá kniha královská 1:1'")
		expect(p.parse("Druhý kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhý kniha kralovska 1:1'")
		expect(p.parse("Druhý kniha kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhý kniha kralovská 1:1'")
		expect(p.parse("Druhý kniha královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhý kniha královska 1:1'")
		expect(p.parse("Druhý kniha královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhý kniha královská 1:1'")
		expect(p.parse("II. kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. kniha kralovska 1:1'")
		expect(p.parse("II. kniha kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. kniha kralovská 1:1'")
		expect(p.parse("II. kniha královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. kniha královska 1:1'")
		expect(p.parse("II. kniha královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. kniha královská 1:1'")
		expect(p.parse("2. kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. kniha kralovska 1:1'")
		expect(p.parse("2. kniha kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. kniha kralovská 1:1'")
		expect(p.parse("2. kniha královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. kniha královska 1:1'")
		expect(p.parse("2. kniha královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. kniha královská 1:1'")
		expect(p.parse("II kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II kniha kralovska 1:1'")
		expect(p.parse("II kniha kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II kniha kralovská 1:1'")
		expect(p.parse("II kniha královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II kniha královska 1:1'")
		expect(p.parse("II kniha královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II kniha královská 1:1'")
		expect(p.parse("2 kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 kniha kralovska 1:1'")
		expect(p.parse("2 kniha kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 kniha kralovská 1:1'")
		expect(p.parse("2 kniha královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 kniha královska 1:1'")
		expect(p.parse("2 kniha královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 kniha královská 1:1'")
		expect(p.parse("Druha Kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druha Kralovska 1:1'")
		expect(p.parse("Druha Kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druha Kralovská 1:1'")
		expect(p.parse("Druha Královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druha Královska 1:1'")
		expect(p.parse("Druha Královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druha Královská 1:1'")
		expect(p.parse("Druhy Kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhy Kralovska 1:1'")
		expect(p.parse("Druhy Kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhy Kralovská 1:1'")
		expect(p.parse("Druhy Královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhy Královska 1:1'")
		expect(p.parse("Druhy Královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhy Královská 1:1'")
		expect(p.parse("Druhá Kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhá Kralovska 1:1'")
		expect(p.parse("Druhá Kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhá Kralovská 1:1'")
		expect(p.parse("Druhá Královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhá Královska 1:1'")
		expect(p.parse("Druhá Královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhá Královská 1:1'")
		expect(p.parse("Druhý Kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhý Kralovska 1:1'")
		expect(p.parse("Druhý Kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhý Kralovská 1:1'")
		expect(p.parse("Druhý Královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhý Královska 1:1'")
		expect(p.parse("Druhý Královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhý Královská 1:1'")
		expect(p.parse("II. Kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. Kralovska 1:1'")
		expect(p.parse("II. Kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. Kralovská 1:1'")
		expect(p.parse("II. Královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. Královska 1:1'")
		expect(p.parse("II. Královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. Královská 1:1'")
		expect(p.parse("2. Kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. Kralovska 1:1'")
		expect(p.parse("2. Kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. Kralovská 1:1'")
		expect(p.parse("2. Královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. Královska 1:1'")
		expect(p.parse("2. Královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. Královská 1:1'")
		expect(p.parse("II Kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II Kralovska 1:1'")
		expect(p.parse("II Kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II Kralovská 1:1'")
		expect(p.parse("II Královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II Královska 1:1'")
		expect(p.parse("II Královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II Královská 1:1'")
		expect(p.parse("2 Kralovska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 Kralovska 1:1'")
		expect(p.parse("2 Kralovská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 Kralovská 1:1'")
		expect(p.parse("2 Královska 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 Královska 1:1'")
		expect(p.parse("2 Královská 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 Královská 1:1'")
		expect(p.parse("Druha Kral 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druha Kral 1:1'")
		expect(p.parse("Druha Král 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druha Král 1:1'")
		expect(p.parse("Druhy Kral 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhy Kral 1:1'")
		expect(p.parse("Druhy Král 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhy Král 1:1'")
		expect(p.parse("Druhá Kral 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhá Kral 1:1'")
		expect(p.parse("Druhá Král 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhá Král 1:1'")
		expect(p.parse("Druhý Kral 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhý Kral 1:1'")
		expect(p.parse("Druhý Král 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhý Král 1:1'")
		expect(p.parse("Druha Kr 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druha Kr 1:1'")
		expect(p.parse("Druhy Kr 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhy Kr 1:1'")
		expect(p.parse("Druhá Kr 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhá Kr 1:1'")
		expect(p.parse("Druhý Kr 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Druhý Kr 1:1'")
		expect(p.parse("II. Kral 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. Kral 1:1'")
		expect(p.parse("II. Král 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. Král 1:1'")
		expect(p.parse("2. Kral 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. Kral 1:1'")
		expect(p.parse("2. Král 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. Král 1:1'")
		expect(p.parse("II Kral 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II Kral 1:1'")
		expect(p.parse("II Král 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II Král 1:1'")
		expect(p.parse("2 Kral 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 Kral 1:1'")
		expect(p.parse("2 Král 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 Král 1:1'")
		expect(p.parse("II. Kr 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. Kr 1:1'")
		expect(p.parse("2. Kr 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. Kr 1:1'")
		expect(p.parse("II Kr 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II Kr 1:1'")
		expect(p.parse("2 Kr 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 Kr 1:1'")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2Kgs 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("DRUHA KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHA KNIHA KRALOVSKA 1:1'")
		expect(p.parse("DRUHA KNIHA KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHA KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("DRUHA KNIHA KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHA KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("DRUHA KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHA KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("DRUHY KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHY KNIHA KRALOVSKA 1:1'")
		expect(p.parse("DRUHY KNIHA KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHY KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("DRUHY KNIHA KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHY KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("DRUHY KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHY KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("DRUHÁ KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÁ KNIHA KRALOVSKA 1:1'")
		expect(p.parse("DRUHÁ KNIHA KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÁ KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("DRUHÁ KNIHA KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÁ KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("DRUHÁ KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÁ KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("DRUHÝ KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÝ KNIHA KRALOVSKA 1:1'")
		expect(p.parse("DRUHÝ KNIHA KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÝ KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("DRUHÝ KNIHA KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÝ KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("DRUHÝ KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÝ KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("II. KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. KNIHA KRALOVSKA 1:1'")
		expect(p.parse("II. KNIHA KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("II. KNIHA KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("II. KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("2. KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. KNIHA KRALOVSKA 1:1'")
		expect(p.parse("2. KNIHA KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("2. KNIHA KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("2. KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("II KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II KNIHA KRALOVSKA 1:1'")
		expect(p.parse("II KNIHA KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("II KNIHA KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("II KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("2 KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 KNIHA KRALOVSKA 1:1'")
		expect(p.parse("2 KNIHA KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("2 KNIHA KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("2 KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("DRUHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHA KRALOVSKA 1:1'")
		expect(p.parse("DRUHA KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHA KRALOVSKÁ 1:1'")
		expect(p.parse("DRUHA KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHA KRÁLOVSKA 1:1'")
		expect(p.parse("DRUHA KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("DRUHY KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHY KRALOVSKA 1:1'")
		expect(p.parse("DRUHY KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHY KRALOVSKÁ 1:1'")
		expect(p.parse("DRUHY KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHY KRÁLOVSKA 1:1'")
		expect(p.parse("DRUHY KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHY KRÁLOVSKÁ 1:1'")
		expect(p.parse("DRUHÁ KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÁ KRALOVSKA 1:1'")
		expect(p.parse("DRUHÁ KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÁ KRALOVSKÁ 1:1'")
		expect(p.parse("DRUHÁ KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÁ KRÁLOVSKA 1:1'")
		expect(p.parse("DRUHÁ KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÁ KRÁLOVSKÁ 1:1'")
		expect(p.parse("DRUHÝ KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÝ KRALOVSKA 1:1'")
		expect(p.parse("DRUHÝ KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÝ KRALOVSKÁ 1:1'")
		expect(p.parse("DRUHÝ KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÝ KRÁLOVSKA 1:1'")
		expect(p.parse("DRUHÝ KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÝ KRÁLOVSKÁ 1:1'")
		expect(p.parse("II. KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. KRALOVSKA 1:1'")
		expect(p.parse("II. KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. KRALOVSKÁ 1:1'")
		expect(p.parse("II. KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. KRÁLOVSKA 1:1'")
		expect(p.parse("II. KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. KRÁLOVSKÁ 1:1'")
		expect(p.parse("2. KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. KRALOVSKA 1:1'")
		expect(p.parse("2. KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. KRALOVSKÁ 1:1'")
		expect(p.parse("2. KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. KRÁLOVSKA 1:1'")
		expect(p.parse("2. KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. KRÁLOVSKÁ 1:1'")
		expect(p.parse("II KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II KRALOVSKA 1:1'")
		expect(p.parse("II KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II KRALOVSKÁ 1:1'")
		expect(p.parse("II KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II KRÁLOVSKA 1:1'")
		expect(p.parse("II KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II KRÁLOVSKÁ 1:1'")
		expect(p.parse("2 KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 KRALOVSKA 1:1'")
		expect(p.parse("2 KRALOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 KRALOVSKÁ 1:1'")
		expect(p.parse("2 KRÁLOVSKA 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 KRÁLOVSKA 1:1'")
		expect(p.parse("2 KRÁLOVSKÁ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 KRÁLOVSKÁ 1:1'")
		expect(p.parse("DRUHA KRAL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHA KRAL 1:1'")
		expect(p.parse("DRUHA KRÁL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHA KRÁL 1:1'")
		expect(p.parse("DRUHY KRAL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHY KRAL 1:1'")
		expect(p.parse("DRUHY KRÁL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHY KRÁL 1:1'")
		expect(p.parse("DRUHÁ KRAL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÁ KRAL 1:1'")
		expect(p.parse("DRUHÁ KRÁL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÁ KRÁL 1:1'")
		expect(p.parse("DRUHÝ KRAL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÝ KRAL 1:1'")
		expect(p.parse("DRUHÝ KRÁL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÝ KRÁL 1:1'")
		expect(p.parse("DRUHA KR 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHA KR 1:1'")
		expect(p.parse("DRUHY KR 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHY KR 1:1'")
		expect(p.parse("DRUHÁ KR 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÁ KR 1:1'")
		expect(p.parse("DRUHÝ KR 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'DRUHÝ KR 1:1'")
		expect(p.parse("II. KRAL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. KRAL 1:1'")
		expect(p.parse("II. KRÁL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. KRÁL 1:1'")
		expect(p.parse("2. KRAL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. KRAL 1:1'")
		expect(p.parse("2. KRÁL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. KRÁL 1:1'")
		expect(p.parse("II KRAL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II KRAL 1:1'")
		expect(p.parse("II KRÁL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II KRÁL 1:1'")
		expect(p.parse("2 KRAL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 KRAL 1:1'")
		expect(p.parse("2 KRÁL 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 KRÁL 1:1'")
		expect(p.parse("II. KR 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. KR 1:1'")
		expect(p.parse("2. KR 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. KR 1:1'")
		expect(p.parse("II KR 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II KR 1:1'")
		expect(p.parse("2 KR 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 KR 1:1'")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2KGS 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Kgs (cs)", function() {
      
		expect(p.parse("Prvni kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Prvni kniha kralovska 1:1'")
		expect(p.parse("Prvni kniha kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Prvni kniha kralovská 1:1'")
		expect(p.parse("Prvni kniha královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Prvni kniha královska 1:1'")
		expect(p.parse("Prvni kniha královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Prvni kniha královská 1:1'")
		expect(p.parse("První kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'První kniha kralovska 1:1'")
		expect(p.parse("První kniha kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'První kniha kralovská 1:1'")
		expect(p.parse("První kniha královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'První kniha královska 1:1'")
		expect(p.parse("První kniha královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'První kniha královská 1:1'")
		expect(p.parse("1. kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. kniha kralovska 1:1'")
		expect(p.parse("1. kniha kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. kniha kralovská 1:1'")
		expect(p.parse("1. kniha královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. kniha královska 1:1'")
		expect(p.parse("1. kniha královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. kniha královská 1:1'")
		expect(p.parse("I. kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. kniha kralovska 1:1'")
		expect(p.parse("I. kniha kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. kniha kralovská 1:1'")
		expect(p.parse("I. kniha královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. kniha královska 1:1'")
		expect(p.parse("I. kniha královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. kniha královská 1:1'")
		expect(p.parse("1 kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 kniha kralovska 1:1'")
		expect(p.parse("1 kniha kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 kniha kralovská 1:1'")
		expect(p.parse("1 kniha královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 kniha královska 1:1'")
		expect(p.parse("1 kniha královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 kniha královská 1:1'")
		expect(p.parse("I kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I kniha kralovska 1:1'")
		expect(p.parse("I kniha kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I kniha kralovská 1:1'")
		expect(p.parse("I kniha královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I kniha královska 1:1'")
		expect(p.parse("I kniha královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I kniha královská 1:1'")
		expect(p.parse("Prvni Kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Prvni Kralovska 1:1'")
		expect(p.parse("Prvni Kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Prvni Kralovská 1:1'")
		expect(p.parse("Prvni Královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Prvni Královska 1:1'")
		expect(p.parse("Prvni Královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Prvni Královská 1:1'")
		expect(p.parse("První Kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'První Kralovska 1:1'")
		expect(p.parse("První Kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'První Kralovská 1:1'")
		expect(p.parse("První Královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'První Královska 1:1'")
		expect(p.parse("První Královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'První Královská 1:1'")
		expect(p.parse("1. Kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. Kralovska 1:1'")
		expect(p.parse("1. Kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. Kralovská 1:1'")
		expect(p.parse("1. Královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. Královska 1:1'")
		expect(p.parse("1. Královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. Královská 1:1'")
		expect(p.parse("I. Kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. Kralovska 1:1'")
		expect(p.parse("I. Kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. Kralovská 1:1'")
		expect(p.parse("I. Královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. Královska 1:1'")
		expect(p.parse("I. Královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. Královská 1:1'")
		expect(p.parse("1 Kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 Kralovska 1:1'")
		expect(p.parse("1 Kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 Kralovská 1:1'")
		expect(p.parse("1 Královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 Královska 1:1'")
		expect(p.parse("1 Královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 Královská 1:1'")
		expect(p.parse("I Kralovska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I Kralovska 1:1'")
		expect(p.parse("I Kralovská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I Kralovská 1:1'")
		expect(p.parse("I Královska 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I Královska 1:1'")
		expect(p.parse("I Královská 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I Královská 1:1'")
		expect(p.parse("Prvni Kral 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Prvni Kral 1:1'")
		expect(p.parse("Prvni Král 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Prvni Král 1:1'")
		expect(p.parse("První Kral 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'První Kral 1:1'")
		expect(p.parse("První Král 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'První Král 1:1'")
		expect(p.parse("Prvni Kr 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Prvni Kr 1:1'")
		expect(p.parse("První Kr 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'První Kr 1:1'")
		expect(p.parse("1. Kral 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. Kral 1:1'")
		expect(p.parse("1. Král 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. Král 1:1'")
		expect(p.parse("I. Kral 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. Kral 1:1'")
		expect(p.parse("I. Král 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. Král 1:1'")
		expect(p.parse("1 Kral 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 Kral 1:1'")
		expect(p.parse("1 Král 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 Král 1:1'")
		expect(p.parse("I Kral 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I Kral 1:1'")
		expect(p.parse("I Král 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I Král 1:1'")
		expect(p.parse("1. Kr 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. Kr 1:1'")
		expect(p.parse("I. Kr 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. Kr 1:1'")
		expect(p.parse("1 Kr 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 Kr 1:1'")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1Kgs 1:1'")
		expect(p.parse("I Kr 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I Kr 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PRVNI KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNI KNIHA KRALOVSKA 1:1'")
		expect(p.parse("PRVNI KNIHA KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNI KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("PRVNI KNIHA KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNI KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("PRVNI KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNI KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("PRVNÍ KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNÍ KNIHA KRALOVSKA 1:1'")
		expect(p.parse("PRVNÍ KNIHA KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNÍ KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("PRVNÍ KNIHA KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNÍ KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("PRVNÍ KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNÍ KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("1. KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. KNIHA KRALOVSKA 1:1'")
		expect(p.parse("1. KNIHA KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("1. KNIHA KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("1. KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("I. KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. KNIHA KRALOVSKA 1:1'")
		expect(p.parse("I. KNIHA KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("I. KNIHA KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("I. KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("1 KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 KNIHA KRALOVSKA 1:1'")
		expect(p.parse("1 KNIHA KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("1 KNIHA KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("1 KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("I KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I KNIHA KRALOVSKA 1:1'")
		expect(p.parse("I KNIHA KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I KNIHA KRALOVSKÁ 1:1'")
		expect(p.parse("I KNIHA KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I KNIHA KRÁLOVSKA 1:1'")
		expect(p.parse("I KNIHA KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I KNIHA KRÁLOVSKÁ 1:1'")
		expect(p.parse("PRVNI KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNI KRALOVSKA 1:1'")
		expect(p.parse("PRVNI KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNI KRALOVSKÁ 1:1'")
		expect(p.parse("PRVNI KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNI KRÁLOVSKA 1:1'")
		expect(p.parse("PRVNI KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNI KRÁLOVSKÁ 1:1'")
		expect(p.parse("PRVNÍ KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNÍ KRALOVSKA 1:1'")
		expect(p.parse("PRVNÍ KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNÍ KRALOVSKÁ 1:1'")
		expect(p.parse("PRVNÍ KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNÍ KRÁLOVSKA 1:1'")
		expect(p.parse("PRVNÍ KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNÍ KRÁLOVSKÁ 1:1'")
		expect(p.parse("1. KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. KRALOVSKA 1:1'")
		expect(p.parse("1. KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. KRALOVSKÁ 1:1'")
		expect(p.parse("1. KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. KRÁLOVSKA 1:1'")
		expect(p.parse("1. KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. KRÁLOVSKÁ 1:1'")
		expect(p.parse("I. KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. KRALOVSKA 1:1'")
		expect(p.parse("I. KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. KRALOVSKÁ 1:1'")
		expect(p.parse("I. KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. KRÁLOVSKA 1:1'")
		expect(p.parse("I. KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. KRÁLOVSKÁ 1:1'")
		expect(p.parse("1 KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 KRALOVSKA 1:1'")
		expect(p.parse("1 KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 KRALOVSKÁ 1:1'")
		expect(p.parse("1 KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 KRÁLOVSKA 1:1'")
		expect(p.parse("1 KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 KRÁLOVSKÁ 1:1'")
		expect(p.parse("I KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I KRALOVSKA 1:1'")
		expect(p.parse("I KRALOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I KRALOVSKÁ 1:1'")
		expect(p.parse("I KRÁLOVSKA 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I KRÁLOVSKA 1:1'")
		expect(p.parse("I KRÁLOVSKÁ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I KRÁLOVSKÁ 1:1'")
		expect(p.parse("PRVNI KRAL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNI KRAL 1:1'")
		expect(p.parse("PRVNI KRÁL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNI KRÁL 1:1'")
		expect(p.parse("PRVNÍ KRAL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNÍ KRAL 1:1'")
		expect(p.parse("PRVNÍ KRÁL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNÍ KRÁL 1:1'")
		expect(p.parse("PRVNI KR 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNI KR 1:1'")
		expect(p.parse("PRVNÍ KR 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'PRVNÍ KR 1:1'")
		expect(p.parse("1. KRAL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. KRAL 1:1'")
		expect(p.parse("1. KRÁL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. KRÁL 1:1'")
		expect(p.parse("I. KRAL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. KRAL 1:1'")
		expect(p.parse("I. KRÁL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. KRÁL 1:1'")
		expect(p.parse("1 KRAL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 KRAL 1:1'")
		expect(p.parse("1 KRÁL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 KRÁL 1:1'")
		expect(p.parse("I KRAL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I KRAL 1:1'")
		expect(p.parse("I KRÁL 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I KRÁL 1:1'")
		expect(p.parse("1. KR 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. KR 1:1'")
		expect(p.parse("I. KR 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. KR 1:1'")
		expect(p.parse("1 KR 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 KR 1:1'")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1KGS 1:1'")
		expect(p.parse("I KR 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I KR 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Chr (cs)", function() {
      
		expect(p.parse("Druha Paralipomenon 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druha Paralipomenon 1:1'")
		expect(p.parse("Druhy Paralipomenon 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhy Paralipomenon 1:1'")
		expect(p.parse("Druhá Paralipomenon 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhá Paralipomenon 1:1'")
		expect(p.parse("Druhý Paralipomenon 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhý Paralipomenon 1:1'")
		expect(p.parse("Druha kniha kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druha kniha kronik 1:1'")
		expect(p.parse("Druhy kniha kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhy kniha kronik 1:1'")
		expect(p.parse("Druhá kniha kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhá kniha kronik 1:1'")
		expect(p.parse("Druhý kniha kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhý kniha kronik 1:1'")
		expect(p.parse("II. Paralipomenon 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. Paralipomenon 1:1'")
		expect(p.parse("2. Paralipomenon 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. Paralipomenon 1:1'")
		expect(p.parse("II Paralipomenon 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II Paralipomenon 1:1'")
		expect(p.parse("II. kniha kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. kniha kronik 1:1'")
		expect(p.parse("2 Paralipomenon 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 Paralipomenon 1:1'")
		expect(p.parse("2. kniha kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. kniha kronik 1:1'")
		expect(p.parse("II kniha kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II kniha kronik 1:1'")
		expect(p.parse("2 kniha kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 kniha kronik 1:1'")
		expect(p.parse("Druha Letopisu 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druha Letopisu 1:1'")
		expect(p.parse("Druha Letopisů 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druha Letopisů 1:1'")
		expect(p.parse("Druhy Letopisu 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhy Letopisu 1:1'")
		expect(p.parse("Druhy Letopisů 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhy Letopisů 1:1'")
		expect(p.parse("Druhá Letopisu 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhá Letopisu 1:1'")
		expect(p.parse("Druhá Letopisů 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhá Letopisů 1:1'")
		expect(p.parse("Druhý Letopisu 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhý Letopisu 1:1'")
		expect(p.parse("Druhý Letopisů 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhý Letopisů 1:1'")
		expect(p.parse("Druha Kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druha Kronik 1:1'")
		expect(p.parse("Druhy Kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhy Kronik 1:1'")
		expect(p.parse("Druhá Kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhá Kronik 1:1'")
		expect(p.parse("Druhý Kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhý Kronik 1:1'")
		expect(p.parse("II. Letopisu 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. Letopisu 1:1'")
		expect(p.parse("II. Letopisů 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. Letopisů 1:1'")
		expect(p.parse("2. Letopisu 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. Letopisu 1:1'")
		expect(p.parse("2. Letopisů 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. Letopisů 1:1'")
		expect(p.parse("II Letopisu 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II Letopisu 1:1'")
		expect(p.parse("II Letopisů 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II Letopisů 1:1'")
		expect(p.parse("2 Letopisu 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 Letopisu 1:1'")
		expect(p.parse("2 Letopisů 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 Letopisů 1:1'")
		expect(p.parse("Druha Kron 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druha Kron 1:1'")
		expect(p.parse("Druhy Kron 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhy Kron 1:1'")
		expect(p.parse("Druhá Kron 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhá Kron 1:1'")
		expect(p.parse("Druhý Kron 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhý Kron 1:1'")
		expect(p.parse("II. Kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. Kronik 1:1'")
		expect(p.parse("2. Kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. Kronik 1:1'")
		expect(p.parse("II Kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II Kronik 1:1'")
		expect(p.parse("2 Kronik 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 Kronik 1:1'")
		expect(p.parse("Druha Pa 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druha Pa 1:1'")
		expect(p.parse("Druhy Pa 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhy Pa 1:1'")
		expect(p.parse("Druhá Pa 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhá Pa 1:1'")
		expect(p.parse("Druhý Pa 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Druhý Pa 1:1'")
		expect(p.parse("II. Kron 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. Kron 1:1'")
		expect(p.parse("2. Kron 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. Kron 1:1'")
		expect(p.parse("II Kron 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II Kron 1:1'")
		expect(p.parse("2 Kron 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 Kron 1:1'")
		expect(p.parse("II. Pa 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. Pa 1:1'")
		expect(p.parse("2. Pa 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. Pa 1:1'")
		expect(p.parse("II Pa 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II Pa 1:1'")
		expect(p.parse("2 Pa 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 Pa 1:1'")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2Chr 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("DRUHA PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHA PARALIPOMENON 1:1'")
		expect(p.parse("DRUHY PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHY PARALIPOMENON 1:1'")
		expect(p.parse("DRUHÁ PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÁ PARALIPOMENON 1:1'")
		expect(p.parse("DRUHÝ PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÝ PARALIPOMENON 1:1'")
		expect(p.parse("DRUHA KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHA KNIHA KRONIK 1:1'")
		expect(p.parse("DRUHY KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHY KNIHA KRONIK 1:1'")
		expect(p.parse("DRUHÁ KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÁ KNIHA KRONIK 1:1'")
		expect(p.parse("DRUHÝ KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÝ KNIHA KRONIK 1:1'")
		expect(p.parse("II. PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. PARALIPOMENON 1:1'")
		expect(p.parse("2. PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. PARALIPOMENON 1:1'")
		expect(p.parse("II PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II PARALIPOMENON 1:1'")
		expect(p.parse("II. KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. KNIHA KRONIK 1:1'")
		expect(p.parse("2 PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 PARALIPOMENON 1:1'")
		expect(p.parse("2. KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. KNIHA KRONIK 1:1'")
		expect(p.parse("II KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II KNIHA KRONIK 1:1'")
		expect(p.parse("2 KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 KNIHA KRONIK 1:1'")
		expect(p.parse("DRUHA LETOPISU 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHA LETOPISU 1:1'")
		expect(p.parse("DRUHA LETOPISŮ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHA LETOPISŮ 1:1'")
		expect(p.parse("DRUHY LETOPISU 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHY LETOPISU 1:1'")
		expect(p.parse("DRUHY LETOPISŮ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHY LETOPISŮ 1:1'")
		expect(p.parse("DRUHÁ LETOPISU 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÁ LETOPISU 1:1'")
		expect(p.parse("DRUHÁ LETOPISŮ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÁ LETOPISŮ 1:1'")
		expect(p.parse("DRUHÝ LETOPISU 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÝ LETOPISU 1:1'")
		expect(p.parse("DRUHÝ LETOPISŮ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÝ LETOPISŮ 1:1'")
		expect(p.parse("DRUHA KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHA KRONIK 1:1'")
		expect(p.parse("DRUHY KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHY KRONIK 1:1'")
		expect(p.parse("DRUHÁ KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÁ KRONIK 1:1'")
		expect(p.parse("DRUHÝ KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÝ KRONIK 1:1'")
		expect(p.parse("II. LETOPISU 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. LETOPISU 1:1'")
		expect(p.parse("II. LETOPISŮ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. LETOPISŮ 1:1'")
		expect(p.parse("2. LETOPISU 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. LETOPISU 1:1'")
		expect(p.parse("2. LETOPISŮ 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. LETOPISŮ 1:1'")
		expect(p.parse("II LETOPISU 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II LETOPISU 1:1'")
		expect(p.parse("II LETOPISŮ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II LETOPISŮ 1:1'")
		expect(p.parse("2 LETOPISU 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 LETOPISU 1:1'")
		expect(p.parse("2 LETOPISŮ 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 LETOPISŮ 1:1'")
		expect(p.parse("DRUHA KRON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHA KRON 1:1'")
		expect(p.parse("DRUHY KRON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHY KRON 1:1'")
		expect(p.parse("DRUHÁ KRON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÁ KRON 1:1'")
		expect(p.parse("DRUHÝ KRON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÝ KRON 1:1'")
		expect(p.parse("II. KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. KRONIK 1:1'")
		expect(p.parse("2. KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. KRONIK 1:1'")
		expect(p.parse("II KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II KRONIK 1:1'")
		expect(p.parse("2 KRONIK 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 KRONIK 1:1'")
		expect(p.parse("DRUHA PA 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHA PA 1:1'")
		expect(p.parse("DRUHY PA 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHY PA 1:1'")
		expect(p.parse("DRUHÁ PA 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÁ PA 1:1'")
		expect(p.parse("DRUHÝ PA 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'DRUHÝ PA 1:1'")
		expect(p.parse("II. KRON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. KRON 1:1'")
		expect(p.parse("2. KRON 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. KRON 1:1'")
		expect(p.parse("II KRON 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II KRON 1:1'")
		expect(p.parse("2 KRON 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 KRON 1:1'")
		expect(p.parse("II. PA 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. PA 1:1'")
		expect(p.parse("2. PA 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. PA 1:1'")
		expect(p.parse("II PA 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II PA 1:1'")
		expect(p.parse("2 PA 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 PA 1:1'")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2CHR 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Chr (cs)", function() {
      
		expect(p.parse("Prvni Paralipomenon 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Prvni Paralipomenon 1:1'")
		expect(p.parse("První Paralipomenon 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'První Paralipomenon 1:1'")
		expect(p.parse("Prvni kniha kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Prvni kniha kronik 1:1'")
		expect(p.parse("První kniha kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'První kniha kronik 1:1'")
		expect(p.parse("1. Paralipomenon 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. Paralipomenon 1:1'")
		expect(p.parse("I. Paralipomenon 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. Paralipomenon 1:1'")
		expect(p.parse("1 Paralipomenon 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 Paralipomenon 1:1'")
		expect(p.parse("1. kniha kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. kniha kronik 1:1'")
		expect(p.parse("I Paralipomenon 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I Paralipomenon 1:1'")
		expect(p.parse("I. kniha kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. kniha kronik 1:1'")
		expect(p.parse("1 kniha kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 kniha kronik 1:1'")
		expect(p.parse("I kniha kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I kniha kronik 1:1'")
		expect(p.parse("Prvni Letopisu 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Prvni Letopisu 1:1'")
		expect(p.parse("Prvni Letopisů 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Prvni Letopisů 1:1'")
		expect(p.parse("První Letopisu 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'První Letopisu 1:1'")
		expect(p.parse("První Letopisů 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'První Letopisů 1:1'")
		expect(p.parse("Prvni Kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Prvni Kronik 1:1'")
		expect(p.parse("První Kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'První Kronik 1:1'")
		expect(p.parse("1. Letopisu 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. Letopisu 1:1'")
		expect(p.parse("1. Letopisů 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. Letopisů 1:1'")
		expect(p.parse("I. Letopisu 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. Letopisu 1:1'")
		expect(p.parse("I. Letopisů 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. Letopisů 1:1'")
		expect(p.parse("1 Letopisu 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 Letopisu 1:1'")
		expect(p.parse("1 Letopisů 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 Letopisů 1:1'")
		expect(p.parse("I Letopisu 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I Letopisu 1:1'")
		expect(p.parse("I Letopisů 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I Letopisů 1:1'")
		expect(p.parse("Prvni Kron 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Prvni Kron 1:1'")
		expect(p.parse("První Kron 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'První Kron 1:1'")
		expect(p.parse("1. Kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. Kronik 1:1'")
		expect(p.parse("I. Kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. Kronik 1:1'")
		expect(p.parse("1 Kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 Kronik 1:1'")
		expect(p.parse("I Kronik 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I Kronik 1:1'")
		expect(p.parse("Prvni Pa 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Prvni Pa 1:1'")
		expect(p.parse("První Pa 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'První Pa 1:1'")
		expect(p.parse("1. Kron 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. Kron 1:1'")
		expect(p.parse("I. Kron 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. Kron 1:1'")
		expect(p.parse("1 Kron 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 Kron 1:1'")
		expect(p.parse("I Kron 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I Kron 1:1'")
		expect(p.parse("1. Pa 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. Pa 1:1'")
		expect(p.parse("I. Pa 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. Pa 1:1'")
		expect(p.parse("1 Pa 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 Pa 1:1'")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1Chr 1:1'")
		expect(p.parse("I Pa 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I Pa 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PRVNI PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNI PARALIPOMENON 1:1'")
		expect(p.parse("PRVNÍ PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNÍ PARALIPOMENON 1:1'")
		expect(p.parse("PRVNI KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNI KNIHA KRONIK 1:1'")
		expect(p.parse("PRVNÍ KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNÍ KNIHA KRONIK 1:1'")
		expect(p.parse("1. PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. PARALIPOMENON 1:1'")
		expect(p.parse("I. PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. PARALIPOMENON 1:1'")
		expect(p.parse("1 PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 PARALIPOMENON 1:1'")
		expect(p.parse("1. KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. KNIHA KRONIK 1:1'")
		expect(p.parse("I PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I PARALIPOMENON 1:1'")
		expect(p.parse("I. KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. KNIHA KRONIK 1:1'")
		expect(p.parse("1 KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 KNIHA KRONIK 1:1'")
		expect(p.parse("I KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I KNIHA KRONIK 1:1'")
		expect(p.parse("PRVNI LETOPISU 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNI LETOPISU 1:1'")
		expect(p.parse("PRVNI LETOPISŮ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNI LETOPISŮ 1:1'")
		expect(p.parse("PRVNÍ LETOPISU 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNÍ LETOPISU 1:1'")
		expect(p.parse("PRVNÍ LETOPISŮ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNÍ LETOPISŮ 1:1'")
		expect(p.parse("PRVNI KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNI KRONIK 1:1'")
		expect(p.parse("PRVNÍ KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNÍ KRONIK 1:1'")
		expect(p.parse("1. LETOPISU 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. LETOPISU 1:1'")
		expect(p.parse("1. LETOPISŮ 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. LETOPISŮ 1:1'")
		expect(p.parse("I. LETOPISU 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. LETOPISU 1:1'")
		expect(p.parse("I. LETOPISŮ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. LETOPISŮ 1:1'")
		expect(p.parse("1 LETOPISU 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 LETOPISU 1:1'")
		expect(p.parse("1 LETOPISŮ 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 LETOPISŮ 1:1'")
		expect(p.parse("I LETOPISU 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I LETOPISU 1:1'")
		expect(p.parse("I LETOPISŮ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I LETOPISŮ 1:1'")
		expect(p.parse("PRVNI KRON 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNI KRON 1:1'")
		expect(p.parse("PRVNÍ KRON 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNÍ KRON 1:1'")
		expect(p.parse("1. KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. KRONIK 1:1'")
		expect(p.parse("I. KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. KRONIK 1:1'")
		expect(p.parse("1 KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 KRONIK 1:1'")
		expect(p.parse("I KRONIK 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I KRONIK 1:1'")
		expect(p.parse("PRVNI PA 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNI PA 1:1'")
		expect(p.parse("PRVNÍ PA 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'PRVNÍ PA 1:1'")
		expect(p.parse("1. KRON 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. KRON 1:1'")
		expect(p.parse("I. KRON 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. KRON 1:1'")
		expect(p.parse("1 KRON 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 KRON 1:1'")
		expect(p.parse("I KRON 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I KRON 1:1'")
		expect(p.parse("1. PA 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. PA 1:1'")
		expect(p.parse("I. PA 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. PA 1:1'")
		expect(p.parse("1 PA 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 PA 1:1'")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1CHR 1:1'")
		expect(p.parse("I PA 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I PA 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ezra (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezra (cs)", function() {
      
		expect(p.parse("Ezdras 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Ezdras 1:1'")
		expect(p.parse("Ezdraš 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Ezdraš 1:1'")
		expect(p.parse("Ezdrás 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Ezdrás 1:1'")
		expect(p.parse("Ezdráš 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Ezdráš 1:1'")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Ezra 1:1'")
		expect(p.parse("Ezd 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Ezd 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("EZDRAS 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'EZDRAS 1:1'")
		expect(p.parse("EZDRAŠ 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'EZDRAŠ 1:1'")
		expect(p.parse("EZDRÁS 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'EZDRÁS 1:1'")
		expect(p.parse("EZDRÁŠ 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'EZDRÁŠ 1:1'")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'EZRA 1:1'")
		expect(p.parse("EZD 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'EZD 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Neh (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Neh (cs)", function() {
      
		expect(p.parse("Nehemias 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Nehemias 1:1'")
		expect(p.parse("Nehemiaš 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Nehemiaš 1:1'")
		expect(p.parse("Nehemiás 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Nehemiás 1:1'")
		expect(p.parse("Nehemiáš 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Nehemiáš 1:1'")
		expect(p.parse("Nehemjas 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Nehemjas 1:1'")
		expect(p.parse("Nehemjaš 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Nehemjaš 1:1'")
		expect(p.parse("Nehemjás 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Nehemjás 1:1'")
		expect(p.parse("Nehemjáš 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Nehemjáš 1:1'")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Neh 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("NEHEMIAS 1:1").osis()).toEqual("Neh.1.1", "parsing: 'NEHEMIAS 1:1'")
		expect(p.parse("NEHEMIAŠ 1:1").osis()).toEqual("Neh.1.1", "parsing: 'NEHEMIAŠ 1:1'")
		expect(p.parse("NEHEMIÁS 1:1").osis()).toEqual("Neh.1.1", "parsing: 'NEHEMIÁS 1:1'")
		expect(p.parse("NEHEMIÁŠ 1:1").osis()).toEqual("Neh.1.1", "parsing: 'NEHEMIÁŠ 1:1'")
		expect(p.parse("NEHEMJAS 1:1").osis()).toEqual("Neh.1.1", "parsing: 'NEHEMJAS 1:1'")
		expect(p.parse("NEHEMJAŠ 1:1").osis()).toEqual("Neh.1.1", "parsing: 'NEHEMJAŠ 1:1'")
		expect(p.parse("NEHEMJÁS 1:1").osis()).toEqual("Neh.1.1", "parsing: 'NEHEMJÁS 1:1'")
		expect(p.parse("NEHEMJÁŠ 1:1").osis()).toEqual("Neh.1.1", "parsing: 'NEHEMJÁŠ 1:1'")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1", "parsing: 'NEH 1:1'")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: GkEsth (cs)", function() {
      
		expect(p.parse("Ester (řecké dodatky) 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester (řecké dodatky) 1:1'")
		expect(p.parse("Ester (řecké části) 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester (řecké části) 1:1'")
		expect(p.parse("Ester recke dodatky 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester recke dodatky 1:1'")
		expect(p.parse("Ester recké dodatky 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester recké dodatky 1:1'")
		expect(p.parse("Ester řecke dodatky 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester řecke dodatky 1:1'")
		expect(p.parse("Ester řecké dodatky 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester řecké dodatky 1:1'")
		expect(p.parse("Ester recke casti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester recke casti 1:1'")
		expect(p.parse("Ester recke cásti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester recke cásti 1:1'")
		expect(p.parse("Ester recke časti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester recke časti 1:1'")
		expect(p.parse("Ester recke části 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester recke části 1:1'")
		expect(p.parse("Ester recké casti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester recké casti 1:1'")
		expect(p.parse("Ester recké cásti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester recké cásti 1:1'")
		expect(p.parse("Ester recké časti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester recké časti 1:1'")
		expect(p.parse("Ester recké části 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester recké části 1:1'")
		expect(p.parse("Ester řecke casti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester řecke casti 1:1'")
		expect(p.parse("Ester řecke cásti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester řecke cásti 1:1'")
		expect(p.parse("Ester řecke časti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester řecke časti 1:1'")
		expect(p.parse("Ester řecke části 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester řecke části 1:1'")
		expect(p.parse("Ester řecké casti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester řecké casti 1:1'")
		expect(p.parse("Ester řecké cásti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester řecké cásti 1:1'")
		expect(p.parse("Ester řecké časti 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester řecké časti 1:1'")
		expect(p.parse("Ester řecké části 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'Ester řecké části 1:1'")
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'GkEsth 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Esth (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Esth (cs)", function() {
      
		expect(p.parse("Ester 1:1").osis()).toEqual("Esth.1.1", "parsing: 'Ester 1:1'")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1", "parsing: 'Esth 1:1'")
		expect(p.parse("Est 1:1").osis()).toEqual("Esth.1.1", "parsing: 'Est 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ESTER 1:1").osis()).toEqual("Esth.1.1", "parsing: 'ESTER 1:1'")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1", "parsing: 'ESTH 1:1'")
		expect(p.parse("EST 1:1").osis()).toEqual("Esth.1.1", "parsing: 'EST 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Job (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Job (cs)", function() {
      
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1", "parsing: 'Job 1:1'")
		expect(p.parse("Jób 1:1").osis()).toEqual("Job.1.1", "parsing: 'Jób 1:1'")
		expect(p.parse("Jb 1:1").osis()).toEqual("Job.1.1", "parsing: 'Jb 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1", "parsing: 'JOB 1:1'")
		expect(p.parse("JÓB 1:1").osis()).toEqual("Job.1.1", "parsing: 'JÓB 1:1'")
		expect(p.parse("JB 1:1").osis()).toEqual("Job.1.1", "parsing: 'JB 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ps (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ps (cs)", function() {
      
		expect(p.parse("Kniha zalmu 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Kniha zalmu 1:1'")
		expect(p.parse("Kniha zalmů 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Kniha zalmů 1:1'")
		expect(p.parse("Kniha žalmu 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Kniha žalmu 1:1'")
		expect(p.parse("Kniha žalmů 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Kniha žalmů 1:1'")
		expect(p.parse("Zalmy 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Zalmy 1:1'")
		expect(p.parse("Žalmy 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Žalmy 1:1'")
		expect(p.parse("Zalm 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Zalm 1:1'")
		expect(p.parse("Žalm 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Žalm 1:1'")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Ps 1:1'")
		expect(p.parse("Zl 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Zl 1:1'")
		expect(p.parse("Žl 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Žl 1:1'")
		expect(p.parse("Z 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Z 1:1'")
		expect(p.parse("Ž 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Ž 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("KNIHA ZALMU 1:1").osis()).toEqual("Ps.1.1", "parsing: 'KNIHA ZALMU 1:1'")
		expect(p.parse("KNIHA ZALMŮ 1:1").osis()).toEqual("Ps.1.1", "parsing: 'KNIHA ZALMŮ 1:1'")
		expect(p.parse("KNIHA ŽALMU 1:1").osis()).toEqual("Ps.1.1", "parsing: 'KNIHA ŽALMU 1:1'")
		expect(p.parse("KNIHA ŽALMŮ 1:1").osis()).toEqual("Ps.1.1", "parsing: 'KNIHA ŽALMŮ 1:1'")
		expect(p.parse("ZALMY 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ZALMY 1:1'")
		expect(p.parse("ŽALMY 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ŽALMY 1:1'")
		expect(p.parse("ZALM 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ZALM 1:1'")
		expect(p.parse("ŽALM 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ŽALM 1:1'")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1", "parsing: 'PS 1:1'")
		expect(p.parse("ZL 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ZL 1:1'")
		expect(p.parse("ŽL 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ŽL 1:1'")
		expect(p.parse("Z 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Z 1:1'")
		expect(p.parse("Ž 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Ž 1:1'")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrAzar (cs)", function() {
      
		expect(p.parse("Azarjasova modlitba 1:1").osis()).toEqual("PrAzar.1.1", "parsing: 'Azarjasova modlitba 1:1'")
		expect(p.parse("Azarjašova modlitba 1:1").osis()).toEqual("PrAzar.1.1", "parsing: 'Azarjašova modlitba 1:1'")
		expect(p.parse("Azarjásova modlitba 1:1").osis()).toEqual("PrAzar.1.1", "parsing: 'Azarjásova modlitba 1:1'")
		expect(p.parse("Azarjášova modlitba 1:1").osis()).toEqual("PrAzar.1.1", "parsing: 'Azarjášova modlitba 1:1'")
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1", "parsing: 'PrAzar 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Prov (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Prov (cs)", function() {
      
		expect(p.parse("Prislovi Salomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prislovi Salomounova 1:1'")
		expect(p.parse("Prislovi Šalomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prislovi Šalomounova 1:1'")
		expect(p.parse("Prisloví Salomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prisloví Salomounova 1:1'")
		expect(p.parse("Prisloví Šalomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prisloví Šalomounova 1:1'")
		expect(p.parse("Príslovi Salomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Príslovi Salomounova 1:1'")
		expect(p.parse("Príslovi Šalomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Príslovi Šalomounova 1:1'")
		expect(p.parse("Prísloví Salomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prísloví Salomounova 1:1'")
		expect(p.parse("Prísloví Šalomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prísloví Šalomounova 1:1'")
		expect(p.parse("Přislovi Salomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Přislovi Salomounova 1:1'")
		expect(p.parse("Přislovi Šalomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Přislovi Šalomounova 1:1'")
		expect(p.parse("Přisloví Salomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Přisloví Salomounova 1:1'")
		expect(p.parse("Přisloví Šalomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Přisloví Šalomounova 1:1'")
		expect(p.parse("Příslovi Salomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Příslovi Salomounova 1:1'")
		expect(p.parse("Příslovi Šalomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Příslovi Šalomounova 1:1'")
		expect(p.parse("Přísloví Salomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Přísloví Salomounova 1:1'")
		expect(p.parse("Přísloví Šalomounova 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Přísloví Šalomounova 1:1'")
		expect(p.parse("Prislovi 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prislovi 1:1'")
		expect(p.parse("Prisloví 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prisloví 1:1'")
		expect(p.parse("Príslovi 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Príslovi 1:1'")
		expect(p.parse("Prísloví 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prísloví 1:1'")
		expect(p.parse("Přislovi 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Přislovi 1:1'")
		expect(p.parse("Přisloví 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Přisloví 1:1'")
		expect(p.parse("Příslovi 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Příslovi 1:1'")
		expect(p.parse("Přísloví 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Přísloví 1:1'")
		expect(p.parse("Pris 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Pris 1:1'")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prov 1:1'")
		expect(p.parse("Prís 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prís 1:1'")
		expect(p.parse("Přis 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Přis 1:1'")
		expect(p.parse("Přís 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Přís 1:1'")
		expect(p.parse("Pr 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Pr 1:1'")
		expect(p.parse("Př 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Př 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PRISLOVI SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRISLOVI SALOMOUNOVA 1:1'")
		expect(p.parse("PRISLOVI ŠALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRISLOVI ŠALOMOUNOVA 1:1'")
		expect(p.parse("PRISLOVÍ SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRISLOVÍ SALOMOUNOVA 1:1'")
		expect(p.parse("PRISLOVÍ ŠALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRISLOVÍ ŠALOMOUNOVA 1:1'")
		expect(p.parse("PRÍSLOVI SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRÍSLOVI SALOMOUNOVA 1:1'")
		expect(p.parse("PRÍSLOVI ŠALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRÍSLOVI ŠALOMOUNOVA 1:1'")
		expect(p.parse("PRÍSLOVÍ SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRÍSLOVÍ SALOMOUNOVA 1:1'")
		expect(p.parse("PRÍSLOVÍ ŠALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRÍSLOVÍ ŠALOMOUNOVA 1:1'")
		expect(p.parse("PŘISLOVI SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘISLOVI SALOMOUNOVA 1:1'")
		expect(p.parse("PŘISLOVI ŠALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘISLOVI ŠALOMOUNOVA 1:1'")
		expect(p.parse("PŘISLOVÍ SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘISLOVÍ SALOMOUNOVA 1:1'")
		expect(p.parse("PŘISLOVÍ ŠALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘISLOVÍ ŠALOMOUNOVA 1:1'")
		expect(p.parse("PŘÍSLOVI SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘÍSLOVI SALOMOUNOVA 1:1'")
		expect(p.parse("PŘÍSLOVI ŠALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘÍSLOVI ŠALOMOUNOVA 1:1'")
		expect(p.parse("PŘÍSLOVÍ SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘÍSLOVÍ SALOMOUNOVA 1:1'")
		expect(p.parse("PŘÍSLOVÍ ŠALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘÍSLOVÍ ŠALOMOUNOVA 1:1'")
		expect(p.parse("PRISLOVI 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRISLOVI 1:1'")
		expect(p.parse("PRISLOVÍ 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRISLOVÍ 1:1'")
		expect(p.parse("PRÍSLOVI 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRÍSLOVI 1:1'")
		expect(p.parse("PRÍSLOVÍ 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRÍSLOVÍ 1:1'")
		expect(p.parse("PŘISLOVI 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘISLOVI 1:1'")
		expect(p.parse("PŘISLOVÍ 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘISLOVÍ 1:1'")
		expect(p.parse("PŘÍSLOVI 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘÍSLOVI 1:1'")
		expect(p.parse("PŘÍSLOVÍ 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘÍSLOVÍ 1:1'")
		expect(p.parse("PRIS 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRIS 1:1'")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PROV 1:1'")
		expect(p.parse("PRÍS 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PRÍS 1:1'")
		expect(p.parse("PŘIS 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘIS 1:1'")
		expect(p.parse("PŘÍS 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘÍS 1:1'")
		expect(p.parse("PR 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PR 1:1'")
		expect(p.parse("PŘ 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PŘ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Eccl (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eccl (cs)", function() {
      
		expect(p.parse("Kazatel 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'Kazatel 1:1'")
		expect(p.parse("Kohelet 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'Kohelet 1:1'")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'Eccl 1:1'")
		expect(p.parse("Kaz 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'Kaz 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("KAZATEL 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'KAZATEL 1:1'")
		expect(p.parse("KOHELET 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'KOHELET 1:1'")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'ECCL 1:1'")
		expect(p.parse("KAZ 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'KAZ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book SgThree (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: SgThree (cs)", function() {
      
		expect(p.parse("Pisen mladencu v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladencu v horici peci 1:1'")
		expect(p.parse("Pisen mladencu v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladencu v horicí peci 1:1'")
		expect(p.parse("Pisen mladencu v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladencu v horíci peci 1:1'")
		expect(p.parse("Pisen mladencu v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladencu v horící peci 1:1'")
		expect(p.parse("Pisen mladencu v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladencu v hořici peci 1:1'")
		expect(p.parse("Pisen mladencu v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladencu v hořicí peci 1:1'")
		expect(p.parse("Pisen mladencu v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladencu v hoříci peci 1:1'")
		expect(p.parse("Pisen mladencu v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladencu v hořící peci 1:1'")
		expect(p.parse("Pisen mladenců v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladenců v horici peci 1:1'")
		expect(p.parse("Pisen mladenců v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladenců v horicí peci 1:1'")
		expect(p.parse("Pisen mladenců v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladenců v horíci peci 1:1'")
		expect(p.parse("Pisen mladenců v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladenců v horící peci 1:1'")
		expect(p.parse("Pisen mladenců v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladenců v hořici peci 1:1'")
		expect(p.parse("Pisen mladenců v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladenců v hořicí peci 1:1'")
		expect(p.parse("Pisen mladenců v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladenců v hoříci peci 1:1'")
		expect(p.parse("Pisen mladenců v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mladenců v hořící peci 1:1'")
		expect(p.parse("Pisen mládencu v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládencu v horici peci 1:1'")
		expect(p.parse("Pisen mládencu v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládencu v horicí peci 1:1'")
		expect(p.parse("Pisen mládencu v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládencu v horíci peci 1:1'")
		expect(p.parse("Pisen mládencu v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládencu v horící peci 1:1'")
		expect(p.parse("Pisen mládencu v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládencu v hořici peci 1:1'")
		expect(p.parse("Pisen mládencu v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládencu v hořicí peci 1:1'")
		expect(p.parse("Pisen mládencu v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládencu v hoříci peci 1:1'")
		expect(p.parse("Pisen mládencu v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládencu v hořící peci 1:1'")
		expect(p.parse("Pisen mládenců v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládenců v horici peci 1:1'")
		expect(p.parse("Pisen mládenců v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládenců v horicí peci 1:1'")
		expect(p.parse("Pisen mládenců v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládenců v horíci peci 1:1'")
		expect(p.parse("Pisen mládenců v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládenců v horící peci 1:1'")
		expect(p.parse("Pisen mládenců v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládenců v hořici peci 1:1'")
		expect(p.parse("Pisen mládenců v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládenců v hořicí peci 1:1'")
		expect(p.parse("Pisen mládenců v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládenců v hoříci peci 1:1'")
		expect(p.parse("Pisen mládenců v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Pisen mládenců v hořící peci 1:1'")
		expect(p.parse("Piseň mladencu v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladencu v horici peci 1:1'")
		expect(p.parse("Piseň mladencu v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladencu v horicí peci 1:1'")
		expect(p.parse("Piseň mladencu v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladencu v horíci peci 1:1'")
		expect(p.parse("Piseň mladencu v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladencu v horící peci 1:1'")
		expect(p.parse("Piseň mladencu v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladencu v hořici peci 1:1'")
		expect(p.parse("Piseň mladencu v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladencu v hořicí peci 1:1'")
		expect(p.parse("Piseň mladencu v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladencu v hoříci peci 1:1'")
		expect(p.parse("Piseň mladencu v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladencu v hořící peci 1:1'")
		expect(p.parse("Piseň mladenců v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladenců v horici peci 1:1'")
		expect(p.parse("Piseň mladenců v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladenců v horicí peci 1:1'")
		expect(p.parse("Piseň mladenců v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladenců v horíci peci 1:1'")
		expect(p.parse("Piseň mladenců v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladenců v horící peci 1:1'")
		expect(p.parse("Piseň mladenců v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladenců v hořici peci 1:1'")
		expect(p.parse("Piseň mladenců v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladenců v hořicí peci 1:1'")
		expect(p.parse("Piseň mladenců v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladenců v hoříci peci 1:1'")
		expect(p.parse("Piseň mladenců v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mladenců v hořící peci 1:1'")
		expect(p.parse("Piseň mládencu v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládencu v horici peci 1:1'")
		expect(p.parse("Piseň mládencu v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládencu v horicí peci 1:1'")
		expect(p.parse("Piseň mládencu v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládencu v horíci peci 1:1'")
		expect(p.parse("Piseň mládencu v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládencu v horící peci 1:1'")
		expect(p.parse("Piseň mládencu v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládencu v hořici peci 1:1'")
		expect(p.parse("Piseň mládencu v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládencu v hořicí peci 1:1'")
		expect(p.parse("Piseň mládencu v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládencu v hoříci peci 1:1'")
		expect(p.parse("Piseň mládencu v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládencu v hořící peci 1:1'")
		expect(p.parse("Piseň mládenců v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládenců v horici peci 1:1'")
		expect(p.parse("Piseň mládenců v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládenců v horicí peci 1:1'")
		expect(p.parse("Piseň mládenců v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládenců v horíci peci 1:1'")
		expect(p.parse("Piseň mládenců v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládenců v horící peci 1:1'")
		expect(p.parse("Piseň mládenců v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládenců v hořici peci 1:1'")
		expect(p.parse("Piseň mládenců v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládenců v hořicí peci 1:1'")
		expect(p.parse("Piseň mládenců v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládenců v hoříci peci 1:1'")
		expect(p.parse("Piseň mládenců v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Piseň mládenců v hořící peci 1:1'")
		expect(p.parse("Písen mladencu v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladencu v horici peci 1:1'")
		expect(p.parse("Písen mladencu v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladencu v horicí peci 1:1'")
		expect(p.parse("Písen mladencu v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladencu v horíci peci 1:1'")
		expect(p.parse("Písen mladencu v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladencu v horící peci 1:1'")
		expect(p.parse("Písen mladencu v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladencu v hořici peci 1:1'")
		expect(p.parse("Písen mladencu v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladencu v hořicí peci 1:1'")
		expect(p.parse("Písen mladencu v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladencu v hoříci peci 1:1'")
		expect(p.parse("Písen mladencu v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladencu v hořící peci 1:1'")
		expect(p.parse("Písen mladenců v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladenců v horici peci 1:1'")
		expect(p.parse("Písen mladenců v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladenců v horicí peci 1:1'")
		expect(p.parse("Písen mladenců v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladenců v horíci peci 1:1'")
		expect(p.parse("Písen mladenců v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladenců v horící peci 1:1'")
		expect(p.parse("Písen mladenců v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladenců v hořici peci 1:1'")
		expect(p.parse("Písen mladenců v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladenců v hořicí peci 1:1'")
		expect(p.parse("Písen mladenců v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladenců v hoříci peci 1:1'")
		expect(p.parse("Písen mladenců v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mladenců v hořící peci 1:1'")
		expect(p.parse("Písen mládencu v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládencu v horici peci 1:1'")
		expect(p.parse("Písen mládencu v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládencu v horicí peci 1:1'")
		expect(p.parse("Písen mládencu v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládencu v horíci peci 1:1'")
		expect(p.parse("Písen mládencu v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládencu v horící peci 1:1'")
		expect(p.parse("Písen mládencu v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládencu v hořici peci 1:1'")
		expect(p.parse("Písen mládencu v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládencu v hořicí peci 1:1'")
		expect(p.parse("Písen mládencu v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládencu v hoříci peci 1:1'")
		expect(p.parse("Písen mládencu v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládencu v hořící peci 1:1'")
		expect(p.parse("Písen mládenců v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládenců v horici peci 1:1'")
		expect(p.parse("Písen mládenců v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládenců v horicí peci 1:1'")
		expect(p.parse("Písen mládenců v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládenců v horíci peci 1:1'")
		expect(p.parse("Písen mládenců v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládenců v horící peci 1:1'")
		expect(p.parse("Písen mládenců v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládenců v hořici peci 1:1'")
		expect(p.parse("Písen mládenců v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládenců v hořicí peci 1:1'")
		expect(p.parse("Písen mládenců v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládenců v hoříci peci 1:1'")
		expect(p.parse("Písen mládenců v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Písen mládenců v hořící peci 1:1'")
		expect(p.parse("Píseň mladencu v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladencu v horici peci 1:1'")
		expect(p.parse("Píseň mladencu v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladencu v horicí peci 1:1'")
		expect(p.parse("Píseň mladencu v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladencu v horíci peci 1:1'")
		expect(p.parse("Píseň mladencu v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladencu v horící peci 1:1'")
		expect(p.parse("Píseň mladencu v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladencu v hořici peci 1:1'")
		expect(p.parse("Píseň mladencu v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladencu v hořicí peci 1:1'")
		expect(p.parse("Píseň mladencu v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladencu v hoříci peci 1:1'")
		expect(p.parse("Píseň mladencu v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladencu v hořící peci 1:1'")
		expect(p.parse("Píseň mladenců v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladenců v horici peci 1:1'")
		expect(p.parse("Píseň mladenců v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladenců v horicí peci 1:1'")
		expect(p.parse("Píseň mladenců v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladenců v horíci peci 1:1'")
		expect(p.parse("Píseň mladenců v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladenců v horící peci 1:1'")
		expect(p.parse("Píseň mladenců v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladenců v hořici peci 1:1'")
		expect(p.parse("Píseň mladenců v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladenců v hořicí peci 1:1'")
		expect(p.parse("Píseň mladenců v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladenců v hoříci peci 1:1'")
		expect(p.parse("Píseň mladenců v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mladenců v hořící peci 1:1'")
		expect(p.parse("Píseň mládencu v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládencu v horici peci 1:1'")
		expect(p.parse("Píseň mládencu v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládencu v horicí peci 1:1'")
		expect(p.parse("Píseň mládencu v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládencu v horíci peci 1:1'")
		expect(p.parse("Píseň mládencu v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládencu v horící peci 1:1'")
		expect(p.parse("Píseň mládencu v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládencu v hořici peci 1:1'")
		expect(p.parse("Píseň mládencu v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládencu v hořicí peci 1:1'")
		expect(p.parse("Píseň mládencu v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládencu v hoříci peci 1:1'")
		expect(p.parse("Píseň mládencu v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládencu v hořící peci 1:1'")
		expect(p.parse("Píseň mládenců v horici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládenců v horici peci 1:1'")
		expect(p.parse("Píseň mládenců v horicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládenců v horicí peci 1:1'")
		expect(p.parse("Píseň mládenců v horíci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládenců v horíci peci 1:1'")
		expect(p.parse("Píseň mládenců v horící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládenců v horící peci 1:1'")
		expect(p.parse("Píseň mládenců v hořici peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládenců v hořici peci 1:1'")
		expect(p.parse("Píseň mládenců v hořicí peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládenců v hořicí peci 1:1'")
		expect(p.parse("Píseň mládenců v hoříci peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládenců v hoříci peci 1:1'")
		expect(p.parse("Píseň mládenců v hořící peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Píseň mládenců v hořící peci 1:1'")
		expect(p.parse("Tri muzi v rozpalene peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tri muzi v rozpalene peci 1:1'")
		expect(p.parse("Tri muzi v rozpalené peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tri muzi v rozpalené peci 1:1'")
		expect(p.parse("Tri muzi v rozpálene peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tri muzi v rozpálene peci 1:1'")
		expect(p.parse("Tri muzi v rozpálené peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tri muzi v rozpálené peci 1:1'")
		expect(p.parse("Tri muži v rozpalene peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tri muži v rozpalene peci 1:1'")
		expect(p.parse("Tri muži v rozpalené peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tri muži v rozpalené peci 1:1'")
		expect(p.parse("Tri muži v rozpálene peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tri muži v rozpálene peci 1:1'")
		expect(p.parse("Tri muži v rozpálené peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tri muži v rozpálené peci 1:1'")
		expect(p.parse("Tři muzi v rozpalene peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tři muzi v rozpalene peci 1:1'")
		expect(p.parse("Tři muzi v rozpalené peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tři muzi v rozpalené peci 1:1'")
		expect(p.parse("Tři muzi v rozpálene peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tři muzi v rozpálene peci 1:1'")
		expect(p.parse("Tři muzi v rozpálené peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tři muzi v rozpálené peci 1:1'")
		expect(p.parse("Tři muži v rozpalene peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tři muži v rozpalene peci 1:1'")
		expect(p.parse("Tři muži v rozpalené peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tři muži v rozpalené peci 1:1'")
		expect(p.parse("Tři muži v rozpálene peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tři muži v rozpálene peci 1:1'")
		expect(p.parse("Tři muži v rozpálené peci 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'Tři muži v rozpálené peci 1:1'")
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'SgThree 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Song (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Song (cs)", function() {
      
		expect(p.parse("Pisen Salamounova 1:1").osis()).toEqual("Song.1.1", "parsing: 'Pisen Salamounova 1:1'")
		expect(p.parse("Pisen Šalamounova 1:1").osis()).toEqual("Song.1.1", "parsing: 'Pisen Šalamounova 1:1'")
		expect(p.parse("Piseň Salamounova 1:1").osis()).toEqual("Song.1.1", "parsing: 'Piseň Salamounova 1:1'")
		expect(p.parse("Piseň Šalamounova 1:1").osis()).toEqual("Song.1.1", "parsing: 'Piseň Šalamounova 1:1'")
		expect(p.parse("Písen Salamounova 1:1").osis()).toEqual("Song.1.1", "parsing: 'Písen Salamounova 1:1'")
		expect(p.parse("Písen Šalamounova 1:1").osis()).toEqual("Song.1.1", "parsing: 'Písen Šalamounova 1:1'")
		expect(p.parse("Píseň Salamounova 1:1").osis()).toEqual("Song.1.1", "parsing: 'Píseň Salamounova 1:1'")
		expect(p.parse("Píseň Šalamounova 1:1").osis()).toEqual("Song.1.1", "parsing: 'Píseň Šalamounova 1:1'")
		expect(p.parse("Pisen pisni 1:1").osis()).toEqual("Song.1.1", "parsing: 'Pisen pisni 1:1'")
		expect(p.parse("Pisen pisní 1:1").osis()).toEqual("Song.1.1", "parsing: 'Pisen pisní 1:1'")
		expect(p.parse("Pisen písni 1:1").osis()).toEqual("Song.1.1", "parsing: 'Pisen písni 1:1'")
		expect(p.parse("Pisen písní 1:1").osis()).toEqual("Song.1.1", "parsing: 'Pisen písní 1:1'")
		expect(p.parse("Piseň pisni 1:1").osis()).toEqual("Song.1.1", "parsing: 'Piseň pisni 1:1'")
		expect(p.parse("Piseň pisní 1:1").osis()).toEqual("Song.1.1", "parsing: 'Piseň pisní 1:1'")
		expect(p.parse("Piseň písni 1:1").osis()).toEqual("Song.1.1", "parsing: 'Piseň písni 1:1'")
		expect(p.parse("Piseň písní 1:1").osis()).toEqual("Song.1.1", "parsing: 'Piseň písní 1:1'")
		expect(p.parse("Písen pisni 1:1").osis()).toEqual("Song.1.1", "parsing: 'Písen pisni 1:1'")
		expect(p.parse("Písen pisní 1:1").osis()).toEqual("Song.1.1", "parsing: 'Písen pisní 1:1'")
		expect(p.parse("Písen písni 1:1").osis()).toEqual("Song.1.1", "parsing: 'Písen písni 1:1'")
		expect(p.parse("Písen písní 1:1").osis()).toEqual("Song.1.1", "parsing: 'Písen písní 1:1'")
		expect(p.parse("Píseň pisni 1:1").osis()).toEqual("Song.1.1", "parsing: 'Píseň pisni 1:1'")
		expect(p.parse("Píseň pisní 1:1").osis()).toEqual("Song.1.1", "parsing: 'Píseň pisní 1:1'")
		expect(p.parse("Píseň písni 1:1").osis()).toEqual("Song.1.1", "parsing: 'Píseň písni 1:1'")
		expect(p.parse("Píseň písní 1:1").osis()).toEqual("Song.1.1", "parsing: 'Píseň písní 1:1'")
		expect(p.parse("Pisen 1:1").osis()).toEqual("Song.1.1", "parsing: 'Pisen 1:1'")
		expect(p.parse("Piseň 1:1").osis()).toEqual("Song.1.1", "parsing: 'Piseň 1:1'")
		expect(p.parse("Písen 1:1").osis()).toEqual("Song.1.1", "parsing: 'Písen 1:1'")
		expect(p.parse("Píseň 1:1").osis()).toEqual("Song.1.1", "parsing: 'Píseň 1:1'")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1", "parsing: 'Song 1:1'")
		expect(p.parse("Pis 1:1").osis()).toEqual("Song.1.1", "parsing: 'Pis 1:1'")
		expect(p.parse("Pís 1:1").osis()).toEqual("Song.1.1", "parsing: 'Pís 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PISEN SALAMOUNOVA 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEN SALAMOUNOVA 1:1'")
		expect(p.parse("PISEN ŠALAMOUNOVA 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEN ŠALAMOUNOVA 1:1'")
		expect(p.parse("PISEŇ SALAMOUNOVA 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEŇ SALAMOUNOVA 1:1'")
		expect(p.parse("PISEŇ ŠALAMOUNOVA 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEŇ ŠALAMOUNOVA 1:1'")
		expect(p.parse("PÍSEN SALAMOUNOVA 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEN SALAMOUNOVA 1:1'")
		expect(p.parse("PÍSEN ŠALAMOUNOVA 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEN ŠALAMOUNOVA 1:1'")
		expect(p.parse("PÍSEŇ SALAMOUNOVA 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEŇ SALAMOUNOVA 1:1'")
		expect(p.parse("PÍSEŇ ŠALAMOUNOVA 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEŇ ŠALAMOUNOVA 1:1'")
		expect(p.parse("PISEN PISNI 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEN PISNI 1:1'")
		expect(p.parse("PISEN PISNÍ 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEN PISNÍ 1:1'")
		expect(p.parse("PISEN PÍSNI 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEN PÍSNI 1:1'")
		expect(p.parse("PISEN PÍSNÍ 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEN PÍSNÍ 1:1'")
		expect(p.parse("PISEŇ PISNI 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEŇ PISNI 1:1'")
		expect(p.parse("PISEŇ PISNÍ 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEŇ PISNÍ 1:1'")
		expect(p.parse("PISEŇ PÍSNI 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEŇ PÍSNI 1:1'")
		expect(p.parse("PISEŇ PÍSNÍ 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEŇ PÍSNÍ 1:1'")
		expect(p.parse("PÍSEN PISNI 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEN PISNI 1:1'")
		expect(p.parse("PÍSEN PISNÍ 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEN PISNÍ 1:1'")
		expect(p.parse("PÍSEN PÍSNI 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEN PÍSNI 1:1'")
		expect(p.parse("PÍSEN PÍSNÍ 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEN PÍSNÍ 1:1'")
		expect(p.parse("PÍSEŇ PISNI 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEŇ PISNI 1:1'")
		expect(p.parse("PÍSEŇ PISNÍ 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEŇ PISNÍ 1:1'")
		expect(p.parse("PÍSEŇ PÍSNI 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEŇ PÍSNI 1:1'")
		expect(p.parse("PÍSEŇ PÍSNÍ 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEŇ PÍSNÍ 1:1'")
		expect(p.parse("PISEN 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEN 1:1'")
		expect(p.parse("PISEŇ 1:1").osis()).toEqual("Song.1.1", "parsing: 'PISEŇ 1:1'")
		expect(p.parse("PÍSEN 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEN 1:1'")
		expect(p.parse("PÍSEŇ 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍSEŇ 1:1'")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1", "parsing: 'SONG 1:1'")
		expect(p.parse("PIS 1:1").osis()).toEqual("Song.1.1", "parsing: 'PIS 1:1'")
		expect(p.parse("PÍS 1:1").osis()).toEqual("Song.1.1", "parsing: 'PÍS 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jer (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jer (cs)", function() {
      
		expect(p.parse("Jeremias 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jeremias 1:1'")
		expect(p.parse("Jeremiaš 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jeremiaš 1:1'")
		expect(p.parse("Jeremiás 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jeremiás 1:1'")
		expect(p.parse("Jeremiáš 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jeremiáš 1:1'")
		expect(p.parse("Jeremjas 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jeremjas 1:1'")
		expect(p.parse("Jeremjaš 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jeremjaš 1:1'")
		expect(p.parse("Jeremjás 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jeremjás 1:1'")
		expect(p.parse("Jeremjáš 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jeremjáš 1:1'")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jer 1:1'")
		expect(p.parse("Jr 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jr 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JEREMIAS 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JEREMIAS 1:1'")
		expect(p.parse("JEREMIAŠ 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JEREMIAŠ 1:1'")
		expect(p.parse("JEREMIÁS 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JEREMIÁS 1:1'")
		expect(p.parse("JEREMIÁŠ 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JEREMIÁŠ 1:1'")
		expect(p.parse("JEREMJAS 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JEREMJAS 1:1'")
		expect(p.parse("JEREMJAŠ 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JEREMJAŠ 1:1'")
		expect(p.parse("JEREMJÁS 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JEREMJÁS 1:1'")
		expect(p.parse("JEREMJÁŠ 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JEREMJÁŠ 1:1'")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JER 1:1'")
		expect(p.parse("JR 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JR 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ezek (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezek (cs)", function() {
      
		expect(p.parse("Ezechiel 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'Ezechiel 1:1'")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'Ezek 1:1'")
		expect(p.parse("Ez 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'Ez 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("EZECHIEL 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'EZECHIEL 1:1'")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'EZEK 1:1'")
		expect(p.parse("EZ 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'EZ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Dan (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Dan (cs)", function() {
      
		expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1", "parsing: 'Daniel 1:1'")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1", "parsing: 'Dan 1:1'")
		expect(p.parse("Da 1:1").osis()).toEqual("Dan.1.1", "parsing: 'Da 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1", "parsing: 'DANIEL 1:1'")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1", "parsing: 'DAN 1:1'")
		expect(p.parse("DA 1:1").osis()).toEqual("Dan.1.1", "parsing: 'DA 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Hos (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hos (cs)", function() {
      
		expect(p.parse("Ozeas 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Ozeas 1:1'")
		expect(p.parse("Ozeaš 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Ozeaš 1:1'")
		expect(p.parse("Ozeás 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Ozeás 1:1'")
		expect(p.parse("Ozeáš 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Ozeáš 1:1'")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Hos 1:1'")
		expect(p.parse("Oz 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Oz 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("OZEAS 1:1").osis()).toEqual("Hos.1.1", "parsing: 'OZEAS 1:1'")
		expect(p.parse("OZEAŠ 1:1").osis()).toEqual("Hos.1.1", "parsing: 'OZEAŠ 1:1'")
		expect(p.parse("OZEÁS 1:1").osis()).toEqual("Hos.1.1", "parsing: 'OZEÁS 1:1'")
		expect(p.parse("OZEÁŠ 1:1").osis()).toEqual("Hos.1.1", "parsing: 'OZEÁŠ 1:1'")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1", "parsing: 'HOS 1:1'")
		expect(p.parse("OZ 1:1").osis()).toEqual("Hos.1.1", "parsing: 'OZ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Joel (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Joel (cs)", function() {
      
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1", "parsing: 'Joel 1:1'")
		expect(p.parse("Jóel 1:1").osis()).toEqual("Joel.1.1", "parsing: 'Jóel 1:1'")
		expect(p.parse("Jl 1:1").osis()).toEqual("Joel.1.1", "parsing: 'Jl 1:1'")
		expect(p.parse("Jo 1:1").osis()).toEqual("Joel.1.1", "parsing: 'Jo 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1", "parsing: 'JOEL 1:1'")
		expect(p.parse("JÓEL 1:1").osis()).toEqual("Joel.1.1", "parsing: 'JÓEL 1:1'")
		expect(p.parse("JL 1:1").osis()).toEqual("Joel.1.1", "parsing: 'JL 1:1'")
		expect(p.parse("JO 1:1").osis()).toEqual("Joel.1.1", "parsing: 'JO 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Amos (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Amos (cs)", function() {
      
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1", "parsing: 'Amos 1:1'")
		expect(p.parse("Ámos 1:1").osis()).toEqual("Amos.1.1", "parsing: 'Ámos 1:1'")
		expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1", "parsing: 'Am 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1", "parsing: 'AMOS 1:1'")
		expect(p.parse("ÁMOS 1:1").osis()).toEqual("Amos.1.1", "parsing: 'ÁMOS 1:1'")
		expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1", "parsing: 'AM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Obad (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Obad (cs)", function() {
      
		expect(p.parse("Abdijas 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Abdijas 1:1'")
		expect(p.parse("Abdijaš 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Abdijaš 1:1'")
		expect(p.parse("Abdijás 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Abdijás 1:1'")
		expect(p.parse("Abdijáš 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Abdijáš 1:1'")
		expect(p.parse("Obadjas 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Obadjas 1:1'")
		expect(p.parse("Obadjaš 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Obadjaš 1:1'")
		expect(p.parse("Obadjás 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Obadjás 1:1'")
		expect(p.parse("Obadjáš 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Obadjáš 1:1'")
		expect(p.parse("Abdias 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Abdias 1:1'")
		expect(p.parse("Abdiaš 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Abdiaš 1:1'")
		expect(p.parse("Abdiás 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Abdiás 1:1'")
		expect(p.parse("Abdiáš 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Abdiáš 1:1'")
		expect(p.parse("Obadja 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Obadja 1:1'")
		expect(p.parse("Obadjá 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Obadjá 1:1'")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Obad 1:1'")
		expect(p.parse("Abd 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Abd 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ABDIJAS 1:1").osis()).toEqual("Obad.1.1", "parsing: 'ABDIJAS 1:1'")
		expect(p.parse("ABDIJAŠ 1:1").osis()).toEqual("Obad.1.1", "parsing: 'ABDIJAŠ 1:1'")
		expect(p.parse("ABDIJÁS 1:1").osis()).toEqual("Obad.1.1", "parsing: 'ABDIJÁS 1:1'")
		expect(p.parse("ABDIJÁŠ 1:1").osis()).toEqual("Obad.1.1", "parsing: 'ABDIJÁŠ 1:1'")
		expect(p.parse("OBADJAS 1:1").osis()).toEqual("Obad.1.1", "parsing: 'OBADJAS 1:1'")
		expect(p.parse("OBADJAŠ 1:1").osis()).toEqual("Obad.1.1", "parsing: 'OBADJAŠ 1:1'")
		expect(p.parse("OBADJÁS 1:1").osis()).toEqual("Obad.1.1", "parsing: 'OBADJÁS 1:1'")
		expect(p.parse("OBADJÁŠ 1:1").osis()).toEqual("Obad.1.1", "parsing: 'OBADJÁŠ 1:1'")
		expect(p.parse("ABDIAS 1:1").osis()).toEqual("Obad.1.1", "parsing: 'ABDIAS 1:1'")
		expect(p.parse("ABDIAŠ 1:1").osis()).toEqual("Obad.1.1", "parsing: 'ABDIAŠ 1:1'")
		expect(p.parse("ABDIÁS 1:1").osis()).toEqual("Obad.1.1", "parsing: 'ABDIÁS 1:1'")
		expect(p.parse("ABDIÁŠ 1:1").osis()).toEqual("Obad.1.1", "parsing: 'ABDIÁŠ 1:1'")
		expect(p.parse("OBADJA 1:1").osis()).toEqual("Obad.1.1", "parsing: 'OBADJA 1:1'")
		expect(p.parse("OBADJÁ 1:1").osis()).toEqual("Obad.1.1", "parsing: 'OBADJÁ 1:1'")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1", "parsing: 'OBAD 1:1'")
		expect(p.parse("ABD 1:1").osis()).toEqual("Obad.1.1", "parsing: 'ABD 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jonah (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jonah (cs)", function() {
      
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'Jonah 1:1'")
		expect(p.parse("Jonas 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'Jonas 1:1'")
		expect(p.parse("Jonaš 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'Jonaš 1:1'")
		expect(p.parse("Jonás 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'Jonás 1:1'")
		expect(p.parse("Jonáš 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'Jonáš 1:1'")
		expect(p.parse("Jon 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'Jon 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'JONAH 1:1'")
		expect(p.parse("JONAS 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'JONAS 1:1'")
		expect(p.parse("JONAŠ 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'JONAŠ 1:1'")
		expect(p.parse("JONÁS 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'JONÁS 1:1'")
		expect(p.parse("JONÁŠ 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'JONÁŠ 1:1'")
		expect(p.parse("JON 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'JON 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Mic (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mic (cs)", function() {
      
		expect(p.parse("Michaas 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Michaas 1:1'")
		expect(p.parse("Michaaš 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Michaaš 1:1'")
		expect(p.parse("Michaás 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Michaás 1:1'")
		expect(p.parse("Michaáš 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Michaáš 1:1'")
		expect(p.parse("Micheas 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Micheas 1:1'")
		expect(p.parse("Micheaš 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Micheaš 1:1'")
		expect(p.parse("Micheás 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Micheás 1:1'")
		expect(p.parse("Micheáš 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Micheáš 1:1'")
		expect(p.parse("Mich 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Mich 1:1'")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Mic 1:1'")
		expect(p.parse("Mi 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Mi 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("MICHAAS 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MICHAAS 1:1'")
		expect(p.parse("MICHAAŠ 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MICHAAŠ 1:1'")
		expect(p.parse("MICHAÁS 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MICHAÁS 1:1'")
		expect(p.parse("MICHAÁŠ 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MICHAÁŠ 1:1'")
		expect(p.parse("MICHEAS 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MICHEAS 1:1'")
		expect(p.parse("MICHEAŠ 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MICHEAŠ 1:1'")
		expect(p.parse("MICHEÁS 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MICHEÁS 1:1'")
		expect(p.parse("MICHEÁŠ 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MICHEÁŠ 1:1'")
		expect(p.parse("MICH 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MICH 1:1'")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MIC 1:1'")
		expect(p.parse("MI 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MI 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Nah (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Nah (cs)", function() {
      
		expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1", "parsing: 'Nahum 1:1'")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1", "parsing: 'Nah 1:1'")
		expect(p.parse("Na 1:1").osis()).toEqual("Nah.1.1", "parsing: 'Na 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1", "parsing: 'NAHUM 1:1'")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1", "parsing: 'NAH 1:1'")
		expect(p.parse("NA 1:1").osis()).toEqual("Nah.1.1", "parsing: 'NA 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Hab (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hab (cs)", function() {
      
		expect(p.parse("Abakuk 1:1").osis()).toEqual("Hab.1.1", "parsing: 'Abakuk 1:1'")
		expect(p.parse("Abk 1:1").osis()).toEqual("Hab.1.1", "parsing: 'Abk 1:1'")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1", "parsing: 'Hab 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ABAKUK 1:1").osis()).toEqual("Hab.1.1", "parsing: 'ABAKUK 1:1'")
		expect(p.parse("ABK 1:1").osis()).toEqual("Hab.1.1", "parsing: 'ABK 1:1'")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1", "parsing: 'HAB 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Zeph (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zeph (cs)", function() {
      
		expect(p.parse("Sofonias 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Sofonias 1:1'")
		expect(p.parse("Sofoniaš 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Sofoniaš 1:1'")
		expect(p.parse("Sofoniás 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Sofoniás 1:1'")
		expect(p.parse("Sofoniáš 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Sofoniáš 1:1'")
		expect(p.parse("Sofonjas 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Sofonjas 1:1'")
		expect(p.parse("Sofonjaš 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Sofonjaš 1:1'")
		expect(p.parse("Sofonjás 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Sofonjás 1:1'")
		expect(p.parse("Sofonjáš 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Sofonjáš 1:1'")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Zeph 1:1'")
		expect(p.parse("Sof 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Sof 1:1'")
		expect(p.parse("Sf 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Sf 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("SOFONIAS 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'SOFONIAS 1:1'")
		expect(p.parse("SOFONIAŠ 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'SOFONIAŠ 1:1'")
		expect(p.parse("SOFONIÁS 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'SOFONIÁS 1:1'")
		expect(p.parse("SOFONIÁŠ 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'SOFONIÁŠ 1:1'")
		expect(p.parse("SOFONJAS 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'SOFONJAS 1:1'")
		expect(p.parse("SOFONJAŠ 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'SOFONJAŠ 1:1'")
		expect(p.parse("SOFONJÁS 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'SOFONJÁS 1:1'")
		expect(p.parse("SOFONJÁŠ 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'SOFONJÁŠ 1:1'")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'ZEPH 1:1'")
		expect(p.parse("SOF 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'SOF 1:1'")
		expect(p.parse("SF 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'SF 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Hag (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hag (cs)", function() {
      
		expect(p.parse("Aggeus 1:1").osis()).toEqual("Hag.1.1", "parsing: 'Aggeus 1:1'")
		expect(p.parse("Ageus 1:1").osis()).toEqual("Hag.1.1", "parsing: 'Ageus 1:1'")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1", "parsing: 'Hag 1:1'")
		expect(p.parse("Ag 1:1").osis()).toEqual("Hag.1.1", "parsing: 'Ag 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("AGGEUS 1:1").osis()).toEqual("Hag.1.1", "parsing: 'AGGEUS 1:1'")
		expect(p.parse("AGEUS 1:1").osis()).toEqual("Hag.1.1", "parsing: 'AGEUS 1:1'")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1", "parsing: 'HAG 1:1'")
		expect(p.parse("AG 1:1").osis()).toEqual("Hag.1.1", "parsing: 'AG 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Zech (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zech (cs)", function() {
      
		expect(p.parse("Zacharias 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zacharias 1:1'")
		expect(p.parse("Zachariaš 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zachariaš 1:1'")
		expect(p.parse("Zachariás 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zachariás 1:1'")
		expect(p.parse("Zachariáš 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zachariáš 1:1'")
		expect(p.parse("Zacharjas 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zacharjas 1:1'")
		expect(p.parse("Zacharjaš 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zacharjaš 1:1'")
		expect(p.parse("Zacharjás 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zacharjás 1:1'")
		expect(p.parse("Zacharjáš 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zacharjáš 1:1'")
		expect(p.parse("Zach 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zach 1:1'")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zech 1:1'")
		expect(p.parse("Za 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Za 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ZACHARIAS 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZACHARIAS 1:1'")
		expect(p.parse("ZACHARIAŠ 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZACHARIAŠ 1:1'")
		expect(p.parse("ZACHARIÁS 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZACHARIÁS 1:1'")
		expect(p.parse("ZACHARIÁŠ 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZACHARIÁŠ 1:1'")
		expect(p.parse("ZACHARJAS 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZACHARJAS 1:1'")
		expect(p.parse("ZACHARJAŠ 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZACHARJAŠ 1:1'")
		expect(p.parse("ZACHARJÁS 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZACHARJÁS 1:1'")
		expect(p.parse("ZACHARJÁŠ 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZACHARJÁŠ 1:1'")
		expect(p.parse("ZACH 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZACH 1:1'")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZECH 1:1'")
		expect(p.parse("ZA 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZA 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Mal (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mal (cs)", function() {
      
		expect(p.parse("Malachias 1:1").osis()).toEqual("Mal.1.1", "parsing: 'Malachias 1:1'")
		expect(p.parse("Malachiaš 1:1").osis()).toEqual("Mal.1.1", "parsing: 'Malachiaš 1:1'")
		expect(p.parse("Malachiás 1:1").osis()).toEqual("Mal.1.1", "parsing: 'Malachiás 1:1'")
		expect(p.parse("Malachiáš 1:1").osis()).toEqual("Mal.1.1", "parsing: 'Malachiáš 1:1'")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1", "parsing: 'Mal 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("MALACHIAS 1:1").osis()).toEqual("Mal.1.1", "parsing: 'MALACHIAS 1:1'")
		expect(p.parse("MALACHIAŠ 1:1").osis()).toEqual("Mal.1.1", "parsing: 'MALACHIAŠ 1:1'")
		expect(p.parse("MALACHIÁS 1:1").osis()).toEqual("Mal.1.1", "parsing: 'MALACHIÁS 1:1'")
		expect(p.parse("MALACHIÁŠ 1:1").osis()).toEqual("Mal.1.1", "parsing: 'MALACHIÁŠ 1:1'")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1", "parsing: 'MAL 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Matt (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Matt (cs)", function() {
      
		expect(p.parse("Evangelium podle Matouse 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Evangelium podle Matouse 1:1'")
		expect(p.parse("Evangelium podle Matouše 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Evangelium podle Matouše 1:1'")
		expect(p.parse("Matousovo evangelium 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Matousovo evangelium 1:1'")
		expect(p.parse("Matoušovo evangelium 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Matoušovo evangelium 1:1'")
		expect(p.parse("Matous 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Matous 1:1'")
		expect(p.parse("Matouš 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Matouš 1:1'")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Matt 1:1'")
		expect(p.parse("Mat 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Mat 1:1'")
		expect(p.parse("Mt 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Mt 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("EVANGELIUM PODLE MATOUSE 1:1").osis()).toEqual("Matt.1.1", "parsing: 'EVANGELIUM PODLE MATOUSE 1:1'")
		expect(p.parse("EVANGELIUM PODLE MATOUŠE 1:1").osis()).toEqual("Matt.1.1", "parsing: 'EVANGELIUM PODLE MATOUŠE 1:1'")
		expect(p.parse("MATOUSOVO EVANGELIUM 1:1").osis()).toEqual("Matt.1.1", "parsing: 'MATOUSOVO EVANGELIUM 1:1'")
		expect(p.parse("MATOUŠOVO EVANGELIUM 1:1").osis()).toEqual("Matt.1.1", "parsing: 'MATOUŠOVO EVANGELIUM 1:1'")
		expect(p.parse("MATOUS 1:1").osis()).toEqual("Matt.1.1", "parsing: 'MATOUS 1:1'")
		expect(p.parse("MATOUŠ 1:1").osis()).toEqual("Matt.1.1", "parsing: 'MATOUŠ 1:1'")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1", "parsing: 'MATT 1:1'")
		expect(p.parse("MAT 1:1").osis()).toEqual("Matt.1.1", "parsing: 'MAT 1:1'")
		expect(p.parse("MT 1:1").osis()).toEqual("Matt.1.1", "parsing: 'MT 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Mark (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mark (cs)", function() {
      
		expect(p.parse("Evangelium podle Marka 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Evangelium podle Marka 1:1'")
		expect(p.parse("Markovo evangelium 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Markovo evangelium 1:1'")
		expect(p.parse("Marek 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Marek 1:1'")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Mark 1:1'")
		expect(p.parse("Mk 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Mk 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("EVANGELIUM PODLE MARKA 1:1").osis()).toEqual("Mark.1.1", "parsing: 'EVANGELIUM PODLE MARKA 1:1'")
		expect(p.parse("MARKOVO EVANGELIUM 1:1").osis()).toEqual("Mark.1.1", "parsing: 'MARKOVO EVANGELIUM 1:1'")
		expect(p.parse("MAREK 1:1").osis()).toEqual("Mark.1.1", "parsing: 'MAREK 1:1'")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1", "parsing: 'MARK 1:1'")
		expect(p.parse("MK 1:1").osis()).toEqual("Mark.1.1", "parsing: 'MK 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Luke (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Luke (cs)", function() {
      
		expect(p.parse("Evangelium podle Lukase 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Evangelium podle Lukase 1:1'")
		expect(p.parse("Evangelium podle Lukaše 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Evangelium podle Lukaše 1:1'")
		expect(p.parse("Evangelium podle Lukáse 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Evangelium podle Lukáse 1:1'")
		expect(p.parse("Evangelium podle Lukáše 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Evangelium podle Lukáše 1:1'")
		expect(p.parse("Lukasovo evangelium 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Lukasovo evangelium 1:1'")
		expect(p.parse("Lukašovo evangelium 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Lukašovo evangelium 1:1'")
		expect(p.parse("Lukásovo evangelium 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Lukásovo evangelium 1:1'")
		expect(p.parse("Lukášovo evangelium 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Lukášovo evangelium 1:1'")
		expect(p.parse("Lukas 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Lukas 1:1'")
		expect(p.parse("Lukaš 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Lukaš 1:1'")
		expect(p.parse("Lukás 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Lukás 1:1'")
		expect(p.parse("Lukáš 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Lukáš 1:1'")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Luke 1:1'")
		expect(p.parse("Lk 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Lk 1:1'")
		expect(p.parse("L 1:1").osis()).toEqual("Luke.1.1", "parsing: 'L 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("EVANGELIUM PODLE LUKASE 1:1").osis()).toEqual("Luke.1.1", "parsing: 'EVANGELIUM PODLE LUKASE 1:1'")
		expect(p.parse("EVANGELIUM PODLE LUKAŠE 1:1").osis()).toEqual("Luke.1.1", "parsing: 'EVANGELIUM PODLE LUKAŠE 1:1'")
		expect(p.parse("EVANGELIUM PODLE LUKÁSE 1:1").osis()).toEqual("Luke.1.1", "parsing: 'EVANGELIUM PODLE LUKÁSE 1:1'")
		expect(p.parse("EVANGELIUM PODLE LUKÁŠE 1:1").osis()).toEqual("Luke.1.1", "parsing: 'EVANGELIUM PODLE LUKÁŠE 1:1'")
		expect(p.parse("LUKASOVO EVANGELIUM 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LUKASOVO EVANGELIUM 1:1'")
		expect(p.parse("LUKAŠOVO EVANGELIUM 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LUKAŠOVO EVANGELIUM 1:1'")
		expect(p.parse("LUKÁSOVO EVANGELIUM 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LUKÁSOVO EVANGELIUM 1:1'")
		expect(p.parse("LUKÁŠOVO EVANGELIUM 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LUKÁŠOVO EVANGELIUM 1:1'")
		expect(p.parse("LUKAS 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LUKAS 1:1'")
		expect(p.parse("LUKAŠ 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LUKAŠ 1:1'")
		expect(p.parse("LUKÁS 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LUKÁS 1:1'")
		expect(p.parse("LUKÁŠ 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LUKÁŠ 1:1'")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LUKE 1:1'")
		expect(p.parse("LK 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LK 1:1'")
		expect(p.parse("L 1:1").osis()).toEqual("Luke.1.1", "parsing: 'L 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1John (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1John (cs)", function() {
      
		expect(p.parse("Prvni list Januv 1:1").osis()).toEqual("1John.1.1", "parsing: 'Prvni list Januv 1:1'")
		expect(p.parse("Prvni list Janův 1:1").osis()).toEqual("1John.1.1", "parsing: 'Prvni list Janův 1:1'")
		expect(p.parse("První list Januv 1:1").osis()).toEqual("1John.1.1", "parsing: 'První list Januv 1:1'")
		expect(p.parse("První list Janův 1:1").osis()).toEqual("1John.1.1", "parsing: 'První list Janův 1:1'")
		expect(p.parse("1. list Januv 1:1").osis()).toEqual("1John.1.1", "parsing: '1. list Januv 1:1'")
		expect(p.parse("1. list Janův 1:1").osis()).toEqual("1John.1.1", "parsing: '1. list Janův 1:1'")
		expect(p.parse("I. list Januv 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. list Januv 1:1'")
		expect(p.parse("I. list Janův 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. list Janův 1:1'")
		expect(p.parse("1 list Januv 1:1").osis()).toEqual("1John.1.1", "parsing: '1 list Januv 1:1'")
		expect(p.parse("1 list Janův 1:1").osis()).toEqual("1John.1.1", "parsing: '1 list Janův 1:1'")
		expect(p.parse("I list Januv 1:1").osis()).toEqual("1John.1.1", "parsing: 'I list Januv 1:1'")
		expect(p.parse("I list Janův 1:1").osis()).toEqual("1John.1.1", "parsing: 'I list Janův 1:1'")
		expect(p.parse("Prvni Janova 1:1").osis()).toEqual("1John.1.1", "parsing: 'Prvni Janova 1:1'")
		expect(p.parse("První Janova 1:1").osis()).toEqual("1John.1.1", "parsing: 'První Janova 1:1'")
		expect(p.parse("Prvni Januv 1:1").osis()).toEqual("1John.1.1", "parsing: 'Prvni Januv 1:1'")
		expect(p.parse("Prvni Janův 1:1").osis()).toEqual("1John.1.1", "parsing: 'Prvni Janův 1:1'")
		expect(p.parse("První Januv 1:1").osis()).toEqual("1John.1.1", "parsing: 'První Januv 1:1'")
		expect(p.parse("První Janův 1:1").osis()).toEqual("1John.1.1", "parsing: 'První Janův 1:1'")
		expect(p.parse("1. Janova 1:1").osis()).toEqual("1John.1.1", "parsing: '1. Janova 1:1'")
		expect(p.parse("I. Janova 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. Janova 1:1'")
		expect(p.parse("Prvni Jan 1:1").osis()).toEqual("1John.1.1", "parsing: 'Prvni Jan 1:1'")
		expect(p.parse("První Jan 1:1").osis()).toEqual("1John.1.1", "parsing: 'První Jan 1:1'")
		expect(p.parse("1 Janova 1:1").osis()).toEqual("1John.1.1", "parsing: '1 Janova 1:1'")
		expect(p.parse("1. Januv 1:1").osis()).toEqual("1John.1.1", "parsing: '1. Januv 1:1'")
		expect(p.parse("1. Janův 1:1").osis()).toEqual("1John.1.1", "parsing: '1. Janův 1:1'")
		expect(p.parse("I Janova 1:1").osis()).toEqual("1John.1.1", "parsing: 'I Janova 1:1'")
		expect(p.parse("I. Januv 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. Januv 1:1'")
		expect(p.parse("I. Janův 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. Janův 1:1'")
		expect(p.parse("1 Januv 1:1").osis()).toEqual("1John.1.1", "parsing: '1 Januv 1:1'")
		expect(p.parse("1 Janův 1:1").osis()).toEqual("1John.1.1", "parsing: '1 Janův 1:1'")
		expect(p.parse("I Januv 1:1").osis()).toEqual("1John.1.1", "parsing: 'I Januv 1:1'")
		expect(p.parse("I Janův 1:1").osis()).toEqual("1John.1.1", "parsing: 'I Janův 1:1'")
		expect(p.parse("Prvni J 1:1").osis()).toEqual("1John.1.1", "parsing: 'Prvni J 1:1'")
		expect(p.parse("První J 1:1").osis()).toEqual("1John.1.1", "parsing: 'První J 1:1'")
		expect(p.parse("1. Jan 1:1").osis()).toEqual("1John.1.1", "parsing: '1. Jan 1:1'")
		expect(p.parse("I. Jan 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. Jan 1:1'")
		expect(p.parse("1 Jan 1:1").osis()).toEqual("1John.1.1", "parsing: '1 Jan 1:1'")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1", "parsing: '1John 1:1'")
		expect(p.parse("I Jan 1:1").osis()).toEqual("1John.1.1", "parsing: 'I Jan 1:1'")
		expect(p.parse("1. J 1:1").osis()).toEqual("1John.1.1", "parsing: '1. J 1:1'")
		expect(p.parse("I. J 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. J 1:1'")
		expect(p.parse("1 J 1:1").osis()).toEqual("1John.1.1", "parsing: '1 J 1:1'")
		expect(p.parse("I J 1:1").osis()).toEqual("1John.1.1", "parsing: 'I J 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PRVNI LIST JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNI LIST JANUV 1:1'")
		expect(p.parse("PRVNI LIST JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNI LIST JANŮV 1:1'")
		expect(p.parse("PRVNÍ LIST JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNÍ LIST JANUV 1:1'")
		expect(p.parse("PRVNÍ LIST JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNÍ LIST JANŮV 1:1'")
		expect(p.parse("1. LIST JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: '1. LIST JANUV 1:1'")
		expect(p.parse("1. LIST JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: '1. LIST JANŮV 1:1'")
		expect(p.parse("I. LIST JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. LIST JANUV 1:1'")
		expect(p.parse("I. LIST JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. LIST JANŮV 1:1'")
		expect(p.parse("1 LIST JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: '1 LIST JANUV 1:1'")
		expect(p.parse("1 LIST JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: '1 LIST JANŮV 1:1'")
		expect(p.parse("I LIST JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: 'I LIST JANUV 1:1'")
		expect(p.parse("I LIST JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: 'I LIST JANŮV 1:1'")
		expect(p.parse("PRVNI JANOVA 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNI JANOVA 1:1'")
		expect(p.parse("PRVNÍ JANOVA 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNÍ JANOVA 1:1'")
		expect(p.parse("PRVNI JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNI JANUV 1:1'")
		expect(p.parse("PRVNI JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNI JANŮV 1:1'")
		expect(p.parse("PRVNÍ JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNÍ JANUV 1:1'")
		expect(p.parse("PRVNÍ JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNÍ JANŮV 1:1'")
		expect(p.parse("1. JANOVA 1:1").osis()).toEqual("1John.1.1", "parsing: '1. JANOVA 1:1'")
		expect(p.parse("I. JANOVA 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. JANOVA 1:1'")
		expect(p.parse("PRVNI JAN 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNI JAN 1:1'")
		expect(p.parse("PRVNÍ JAN 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNÍ JAN 1:1'")
		expect(p.parse("1 JANOVA 1:1").osis()).toEqual("1John.1.1", "parsing: '1 JANOVA 1:1'")
		expect(p.parse("1. JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: '1. JANUV 1:1'")
		expect(p.parse("1. JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: '1. JANŮV 1:1'")
		expect(p.parse("I JANOVA 1:1").osis()).toEqual("1John.1.1", "parsing: 'I JANOVA 1:1'")
		expect(p.parse("I. JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. JANUV 1:1'")
		expect(p.parse("I. JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. JANŮV 1:1'")
		expect(p.parse("1 JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: '1 JANUV 1:1'")
		expect(p.parse("1 JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: '1 JANŮV 1:1'")
		expect(p.parse("I JANUV 1:1").osis()).toEqual("1John.1.1", "parsing: 'I JANUV 1:1'")
		expect(p.parse("I JANŮV 1:1").osis()).toEqual("1John.1.1", "parsing: 'I JANŮV 1:1'")
		expect(p.parse("PRVNI J 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNI J 1:1'")
		expect(p.parse("PRVNÍ J 1:1").osis()).toEqual("1John.1.1", "parsing: 'PRVNÍ J 1:1'")
		expect(p.parse("1. JAN 1:1").osis()).toEqual("1John.1.1", "parsing: '1. JAN 1:1'")
		expect(p.parse("I. JAN 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. JAN 1:1'")
		expect(p.parse("1 JAN 1:1").osis()).toEqual("1John.1.1", "parsing: '1 JAN 1:1'")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1", "parsing: '1JOHN 1:1'")
		expect(p.parse("I JAN 1:1").osis()).toEqual("1John.1.1", "parsing: 'I JAN 1:1'")
		expect(p.parse("1. J 1:1").osis()).toEqual("1John.1.1", "parsing: '1. J 1:1'")
		expect(p.parse("I. J 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. J 1:1'")
		expect(p.parse("1 J 1:1").osis()).toEqual("1John.1.1", "parsing: '1 J 1:1'")
		expect(p.parse("I J 1:1").osis()).toEqual("1John.1.1", "parsing: 'I J 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2John (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2John (cs)", function() {
      
		expect(p.parse("Druha list Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druha list Januv 1:1'")
		expect(p.parse("Druha list Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druha list Janův 1:1'")
		expect(p.parse("Druhy list Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhy list Januv 1:1'")
		expect(p.parse("Druhy list Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhy list Janův 1:1'")
		expect(p.parse("Druhá list Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhá list Januv 1:1'")
		expect(p.parse("Druhá list Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhá list Janův 1:1'")
		expect(p.parse("Druhý list Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhý list Januv 1:1'")
		expect(p.parse("Druhý list Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhý list Janův 1:1'")
		expect(p.parse("II. list Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. list Januv 1:1'")
		expect(p.parse("II. list Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. list Janův 1:1'")
		expect(p.parse("2. list Januv 1:1").osis()).toEqual("2John.1.1", "parsing: '2. list Januv 1:1'")
		expect(p.parse("2. list Janův 1:1").osis()).toEqual("2John.1.1", "parsing: '2. list Janův 1:1'")
		expect(p.parse("II list Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'II list Januv 1:1'")
		expect(p.parse("II list Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'II list Janův 1:1'")
		expect(p.parse("2 list Januv 1:1").osis()).toEqual("2John.1.1", "parsing: '2 list Januv 1:1'")
		expect(p.parse("2 list Janův 1:1").osis()).toEqual("2John.1.1", "parsing: '2 list Janův 1:1'")
		expect(p.parse("Druha Janova 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druha Janova 1:1'")
		expect(p.parse("Druhy Janova 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhy Janova 1:1'")
		expect(p.parse("Druhá Janova 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhá Janova 1:1'")
		expect(p.parse("Druhý Janova 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhý Janova 1:1'")
		expect(p.parse("Druha Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druha Januv 1:1'")
		expect(p.parse("Druha Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druha Janův 1:1'")
		expect(p.parse("Druhy Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhy Januv 1:1'")
		expect(p.parse("Druhy Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhy Janův 1:1'")
		expect(p.parse("Druhá Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhá Januv 1:1'")
		expect(p.parse("Druhá Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhá Janův 1:1'")
		expect(p.parse("Druhý Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhý Januv 1:1'")
		expect(p.parse("Druhý Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhý Janův 1:1'")
		expect(p.parse("II. Janova 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. Janova 1:1'")
		expect(p.parse("2. Janova 1:1").osis()).toEqual("2John.1.1", "parsing: '2. Janova 1:1'")
		expect(p.parse("Druha Jan 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druha Jan 1:1'")
		expect(p.parse("Druhy Jan 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhy Jan 1:1'")
		expect(p.parse("Druhá Jan 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhá Jan 1:1'")
		expect(p.parse("Druhý Jan 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhý Jan 1:1'")
		expect(p.parse("II Janova 1:1").osis()).toEqual("2John.1.1", "parsing: 'II Janova 1:1'")
		expect(p.parse("II. Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. Januv 1:1'")
		expect(p.parse("II. Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. Janův 1:1'")
		expect(p.parse("2 Janova 1:1").osis()).toEqual("2John.1.1", "parsing: '2 Janova 1:1'")
		expect(p.parse("2. Januv 1:1").osis()).toEqual("2John.1.1", "parsing: '2. Januv 1:1'")
		expect(p.parse("2. Janův 1:1").osis()).toEqual("2John.1.1", "parsing: '2. Janův 1:1'")
		expect(p.parse("II Januv 1:1").osis()).toEqual("2John.1.1", "parsing: 'II Januv 1:1'")
		expect(p.parse("II Janův 1:1").osis()).toEqual("2John.1.1", "parsing: 'II Janův 1:1'")
		expect(p.parse("2 Januv 1:1").osis()).toEqual("2John.1.1", "parsing: '2 Januv 1:1'")
		expect(p.parse("2 Janův 1:1").osis()).toEqual("2John.1.1", "parsing: '2 Janův 1:1'")
		expect(p.parse("Druha J 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druha J 1:1'")
		expect(p.parse("Druhy J 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhy J 1:1'")
		expect(p.parse("Druhá J 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhá J 1:1'")
		expect(p.parse("Druhý J 1:1").osis()).toEqual("2John.1.1", "parsing: 'Druhý J 1:1'")
		expect(p.parse("II. Jan 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. Jan 1:1'")
		expect(p.parse("2. Jan 1:1").osis()).toEqual("2John.1.1", "parsing: '2. Jan 1:1'")
		expect(p.parse("II Jan 1:1").osis()).toEqual("2John.1.1", "parsing: 'II Jan 1:1'")
		expect(p.parse("2 Jan 1:1").osis()).toEqual("2John.1.1", "parsing: '2 Jan 1:1'")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1", "parsing: '2John 1:1'")
		expect(p.parse("II. J 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. J 1:1'")
		expect(p.parse("2. J 1:1").osis()).toEqual("2John.1.1", "parsing: '2. J 1:1'")
		expect(p.parse("II J 1:1").osis()).toEqual("2John.1.1", "parsing: 'II J 1:1'")
		expect(p.parse("2 J 1:1").osis()).toEqual("2John.1.1", "parsing: '2 J 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("DRUHA LIST JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHA LIST JANUV 1:1'")
		expect(p.parse("DRUHA LIST JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHA LIST JANŮV 1:1'")
		expect(p.parse("DRUHY LIST JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHY LIST JANUV 1:1'")
		expect(p.parse("DRUHY LIST JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHY LIST JANŮV 1:1'")
		expect(p.parse("DRUHÁ LIST JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÁ LIST JANUV 1:1'")
		expect(p.parse("DRUHÁ LIST JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÁ LIST JANŮV 1:1'")
		expect(p.parse("DRUHÝ LIST JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÝ LIST JANUV 1:1'")
		expect(p.parse("DRUHÝ LIST JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÝ LIST JANŮV 1:1'")
		expect(p.parse("II. LIST JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. LIST JANUV 1:1'")
		expect(p.parse("II. LIST JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. LIST JANŮV 1:1'")
		expect(p.parse("2. LIST JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: '2. LIST JANUV 1:1'")
		expect(p.parse("2. LIST JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: '2. LIST JANŮV 1:1'")
		expect(p.parse("II LIST JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'II LIST JANUV 1:1'")
		expect(p.parse("II LIST JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'II LIST JANŮV 1:1'")
		expect(p.parse("2 LIST JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: '2 LIST JANUV 1:1'")
		expect(p.parse("2 LIST JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: '2 LIST JANŮV 1:1'")
		expect(p.parse("DRUHA JANOVA 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHA JANOVA 1:1'")
		expect(p.parse("DRUHY JANOVA 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHY JANOVA 1:1'")
		expect(p.parse("DRUHÁ JANOVA 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÁ JANOVA 1:1'")
		expect(p.parse("DRUHÝ JANOVA 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÝ JANOVA 1:1'")
		expect(p.parse("DRUHA JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHA JANUV 1:1'")
		expect(p.parse("DRUHA JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHA JANŮV 1:1'")
		expect(p.parse("DRUHY JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHY JANUV 1:1'")
		expect(p.parse("DRUHY JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHY JANŮV 1:1'")
		expect(p.parse("DRUHÁ JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÁ JANUV 1:1'")
		expect(p.parse("DRUHÁ JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÁ JANŮV 1:1'")
		expect(p.parse("DRUHÝ JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÝ JANUV 1:1'")
		expect(p.parse("DRUHÝ JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÝ JANŮV 1:1'")
		expect(p.parse("II. JANOVA 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. JANOVA 1:1'")
		expect(p.parse("2. JANOVA 1:1").osis()).toEqual("2John.1.1", "parsing: '2. JANOVA 1:1'")
		expect(p.parse("DRUHA JAN 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHA JAN 1:1'")
		expect(p.parse("DRUHY JAN 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHY JAN 1:1'")
		expect(p.parse("DRUHÁ JAN 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÁ JAN 1:1'")
		expect(p.parse("DRUHÝ JAN 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÝ JAN 1:1'")
		expect(p.parse("II JANOVA 1:1").osis()).toEqual("2John.1.1", "parsing: 'II JANOVA 1:1'")
		expect(p.parse("II. JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. JANUV 1:1'")
		expect(p.parse("II. JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. JANŮV 1:1'")
		expect(p.parse("2 JANOVA 1:1").osis()).toEqual("2John.1.1", "parsing: '2 JANOVA 1:1'")
		expect(p.parse("2. JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: '2. JANUV 1:1'")
		expect(p.parse("2. JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: '2. JANŮV 1:1'")
		expect(p.parse("II JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: 'II JANUV 1:1'")
		expect(p.parse("II JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: 'II JANŮV 1:1'")
		expect(p.parse("2 JANUV 1:1").osis()).toEqual("2John.1.1", "parsing: '2 JANUV 1:1'")
		expect(p.parse("2 JANŮV 1:1").osis()).toEqual("2John.1.1", "parsing: '2 JANŮV 1:1'")
		expect(p.parse("DRUHA J 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHA J 1:1'")
		expect(p.parse("DRUHY J 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHY J 1:1'")
		expect(p.parse("DRUHÁ J 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÁ J 1:1'")
		expect(p.parse("DRUHÝ J 1:1").osis()).toEqual("2John.1.1", "parsing: 'DRUHÝ J 1:1'")
		expect(p.parse("II. JAN 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. JAN 1:1'")
		expect(p.parse("2. JAN 1:1").osis()).toEqual("2John.1.1", "parsing: '2. JAN 1:1'")
		expect(p.parse("II JAN 1:1").osis()).toEqual("2John.1.1", "parsing: 'II JAN 1:1'")
		expect(p.parse("2 JAN 1:1").osis()).toEqual("2John.1.1", "parsing: '2 JAN 1:1'")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1", "parsing: '2JOHN 1:1'")
		expect(p.parse("II. J 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. J 1:1'")
		expect(p.parse("2. J 1:1").osis()).toEqual("2John.1.1", "parsing: '2. J 1:1'")
		expect(p.parse("II J 1:1").osis()).toEqual("2John.1.1", "parsing: 'II J 1:1'")
		expect(p.parse("2 J 1:1").osis()).toEqual("2John.1.1", "parsing: '2 J 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 3John (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3John (cs)", function() {
      
		expect(p.parse("Treti list Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'Treti list Januv 1:1'")
		expect(p.parse("Treti list Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'Treti list Janův 1:1'")
		expect(p.parse("Tretí list Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'Tretí list Januv 1:1'")
		expect(p.parse("Tretí list Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'Tretí list Janův 1:1'")
		expect(p.parse("Třeti list Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třeti list Januv 1:1'")
		expect(p.parse("Třeti list Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třeti list Janův 1:1'")
		expect(p.parse("Třetí list Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třetí list Januv 1:1'")
		expect(p.parse("Třetí list Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třetí list Janův 1:1'")
		expect(p.parse("III. list Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. list Januv 1:1'")
		expect(p.parse("III. list Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. list Janův 1:1'")
		expect(p.parse("III list Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'III list Januv 1:1'")
		expect(p.parse("III list Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'III list Janův 1:1'")
		expect(p.parse("3. list Januv 1:1").osis()).toEqual("3John.1.1", "parsing: '3. list Januv 1:1'")
		expect(p.parse("3. list Janův 1:1").osis()).toEqual("3John.1.1", "parsing: '3. list Janův 1:1'")
		expect(p.parse("3 list Januv 1:1").osis()).toEqual("3John.1.1", "parsing: '3 list Januv 1:1'")
		expect(p.parse("3 list Janův 1:1").osis()).toEqual("3John.1.1", "parsing: '3 list Janův 1:1'")
		expect(p.parse("Treti Janova 1:1").osis()).toEqual("3John.1.1", "parsing: 'Treti Janova 1:1'")
		expect(p.parse("Tretí Janova 1:1").osis()).toEqual("3John.1.1", "parsing: 'Tretí Janova 1:1'")
		expect(p.parse("Třeti Janova 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třeti Janova 1:1'")
		expect(p.parse("Třetí Janova 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třetí Janova 1:1'")
		expect(p.parse("III. Janova 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. Janova 1:1'")
		expect(p.parse("Treti Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'Treti Januv 1:1'")
		expect(p.parse("Treti Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'Treti Janův 1:1'")
		expect(p.parse("Tretí Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'Tretí Januv 1:1'")
		expect(p.parse("Tretí Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'Tretí Janův 1:1'")
		expect(p.parse("Třeti Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třeti Januv 1:1'")
		expect(p.parse("Třeti Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třeti Janův 1:1'")
		expect(p.parse("Třetí Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třetí Januv 1:1'")
		expect(p.parse("Třetí Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třetí Janův 1:1'")
		expect(p.parse("III Janova 1:1").osis()).toEqual("3John.1.1", "parsing: 'III Janova 1:1'")
		expect(p.parse("III. Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. Januv 1:1'")
		expect(p.parse("III. Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. Janův 1:1'")
		expect(p.parse("3. Janova 1:1").osis()).toEqual("3John.1.1", "parsing: '3. Janova 1:1'")
		expect(p.parse("III Januv 1:1").osis()).toEqual("3John.1.1", "parsing: 'III Januv 1:1'")
		expect(p.parse("III Janův 1:1").osis()).toEqual("3John.1.1", "parsing: 'III Janův 1:1'")
		expect(p.parse("Treti Jan 1:1").osis()).toEqual("3John.1.1", "parsing: 'Treti Jan 1:1'")
		expect(p.parse("Tretí Jan 1:1").osis()).toEqual("3John.1.1", "parsing: 'Tretí Jan 1:1'")
		expect(p.parse("Třeti Jan 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třeti Jan 1:1'")
		expect(p.parse("Třetí Jan 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třetí Jan 1:1'")
		expect(p.parse("3 Janova 1:1").osis()).toEqual("3John.1.1", "parsing: '3 Janova 1:1'")
		expect(p.parse("3. Januv 1:1").osis()).toEqual("3John.1.1", "parsing: '3. Januv 1:1'")
		expect(p.parse("3. Janův 1:1").osis()).toEqual("3John.1.1", "parsing: '3. Janův 1:1'")
		expect(p.parse("III. Jan 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. Jan 1:1'")
		expect(p.parse("3 Januv 1:1").osis()).toEqual("3John.1.1", "parsing: '3 Januv 1:1'")
		expect(p.parse("3 Janův 1:1").osis()).toEqual("3John.1.1", "parsing: '3 Janův 1:1'")
		expect(p.parse("III Jan 1:1").osis()).toEqual("3John.1.1", "parsing: 'III Jan 1:1'")
		expect(p.parse("Treti J 1:1").osis()).toEqual("3John.1.1", "parsing: 'Treti J 1:1'")
		expect(p.parse("Tretí J 1:1").osis()).toEqual("3John.1.1", "parsing: 'Tretí J 1:1'")
		expect(p.parse("Třeti J 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třeti J 1:1'")
		expect(p.parse("Třetí J 1:1").osis()).toEqual("3John.1.1", "parsing: 'Třetí J 1:1'")
		expect(p.parse("3. Jan 1:1").osis()).toEqual("3John.1.1", "parsing: '3. Jan 1:1'")
		expect(p.parse("III. J 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. J 1:1'")
		expect(p.parse("3 Jan 1:1").osis()).toEqual("3John.1.1", "parsing: '3 Jan 1:1'")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1", "parsing: '3John 1:1'")
		expect(p.parse("III J 1:1").osis()).toEqual("3John.1.1", "parsing: 'III J 1:1'")
		expect(p.parse("3. J 1:1").osis()).toEqual("3John.1.1", "parsing: '3. J 1:1'")
		expect(p.parse("3 J 1:1").osis()).toEqual("3John.1.1", "parsing: '3 J 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("TRETI LIST JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETI LIST JANUV 1:1'")
		expect(p.parse("TRETI LIST JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETI LIST JANŮV 1:1'")
		expect(p.parse("TRETÍ LIST JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETÍ LIST JANUV 1:1'")
		expect(p.parse("TRETÍ LIST JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETÍ LIST JANŮV 1:1'")
		expect(p.parse("TŘETI LIST JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETI LIST JANUV 1:1'")
		expect(p.parse("TŘETI LIST JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETI LIST JANŮV 1:1'")
		expect(p.parse("TŘETÍ LIST JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETÍ LIST JANUV 1:1'")
		expect(p.parse("TŘETÍ LIST JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETÍ LIST JANŮV 1:1'")
		expect(p.parse("III. LIST JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. LIST JANUV 1:1'")
		expect(p.parse("III. LIST JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. LIST JANŮV 1:1'")
		expect(p.parse("III LIST JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'III LIST JANUV 1:1'")
		expect(p.parse("III LIST JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'III LIST JANŮV 1:1'")
		expect(p.parse("3. LIST JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: '3. LIST JANUV 1:1'")
		expect(p.parse("3. LIST JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: '3. LIST JANŮV 1:1'")
		expect(p.parse("3 LIST JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: '3 LIST JANUV 1:1'")
		expect(p.parse("3 LIST JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: '3 LIST JANŮV 1:1'")
		expect(p.parse("TRETI JANOVA 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETI JANOVA 1:1'")
		expect(p.parse("TRETÍ JANOVA 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETÍ JANOVA 1:1'")
		expect(p.parse("TŘETI JANOVA 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETI JANOVA 1:1'")
		expect(p.parse("TŘETÍ JANOVA 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETÍ JANOVA 1:1'")
		expect(p.parse("III. JANOVA 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. JANOVA 1:1'")
		expect(p.parse("TRETI JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETI JANUV 1:1'")
		expect(p.parse("TRETI JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETI JANŮV 1:1'")
		expect(p.parse("TRETÍ JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETÍ JANUV 1:1'")
		expect(p.parse("TRETÍ JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETÍ JANŮV 1:1'")
		expect(p.parse("TŘETI JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETI JANUV 1:1'")
		expect(p.parse("TŘETI JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETI JANŮV 1:1'")
		expect(p.parse("TŘETÍ JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETÍ JANUV 1:1'")
		expect(p.parse("TŘETÍ JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETÍ JANŮV 1:1'")
		expect(p.parse("III JANOVA 1:1").osis()).toEqual("3John.1.1", "parsing: 'III JANOVA 1:1'")
		expect(p.parse("III. JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. JANUV 1:1'")
		expect(p.parse("III. JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. JANŮV 1:1'")
		expect(p.parse("3. JANOVA 1:1").osis()).toEqual("3John.1.1", "parsing: '3. JANOVA 1:1'")
		expect(p.parse("III JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: 'III JANUV 1:1'")
		expect(p.parse("III JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: 'III JANŮV 1:1'")
		expect(p.parse("TRETI JAN 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETI JAN 1:1'")
		expect(p.parse("TRETÍ JAN 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETÍ JAN 1:1'")
		expect(p.parse("TŘETI JAN 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETI JAN 1:1'")
		expect(p.parse("TŘETÍ JAN 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETÍ JAN 1:1'")
		expect(p.parse("3 JANOVA 1:1").osis()).toEqual("3John.1.1", "parsing: '3 JANOVA 1:1'")
		expect(p.parse("3. JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: '3. JANUV 1:1'")
		expect(p.parse("3. JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: '3. JANŮV 1:1'")
		expect(p.parse("III. JAN 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. JAN 1:1'")
		expect(p.parse("3 JANUV 1:1").osis()).toEqual("3John.1.1", "parsing: '3 JANUV 1:1'")
		expect(p.parse("3 JANŮV 1:1").osis()).toEqual("3John.1.1", "parsing: '3 JANŮV 1:1'")
		expect(p.parse("III JAN 1:1").osis()).toEqual("3John.1.1", "parsing: 'III JAN 1:1'")
		expect(p.parse("TRETI J 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETI J 1:1'")
		expect(p.parse("TRETÍ J 1:1").osis()).toEqual("3John.1.1", "parsing: 'TRETÍ J 1:1'")
		expect(p.parse("TŘETI J 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETI J 1:1'")
		expect(p.parse("TŘETÍ J 1:1").osis()).toEqual("3John.1.1", "parsing: 'TŘETÍ J 1:1'")
		expect(p.parse("3. JAN 1:1").osis()).toEqual("3John.1.1", "parsing: '3. JAN 1:1'")
		expect(p.parse("III. J 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. J 1:1'")
		expect(p.parse("3 JAN 1:1").osis()).toEqual("3John.1.1", "parsing: '3 JAN 1:1'")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1", "parsing: '3JOHN 1:1'")
		expect(p.parse("III J 1:1").osis()).toEqual("3John.1.1", "parsing: 'III J 1:1'")
		expect(p.parse("3. J 1:1").osis()).toEqual("3John.1.1", "parsing: '3. J 1:1'")
		expect(p.parse("3 J 1:1").osis()).toEqual("3John.1.1", "parsing: '3 J 1:1'")
		;
      return true;
    });
  });

  describe("Localized book John (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: John (cs)", function() {
      
		expect(p.parse("Evangelium podle Jana 1:1").osis()).toEqual("John.1.1", "parsing: 'Evangelium podle Jana 1:1'")
		expect(p.parse("Janovo evangelium 1:1").osis()).toEqual("John.1.1", "parsing: 'Janovo evangelium 1:1'")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1", "parsing: 'John 1:1'")
		expect(p.parse("Jan 1:1").osis()).toEqual("John.1.1", "parsing: 'Jan 1:1'")
		expect(p.parse("J 1:1").osis()).toEqual("John.1.1", "parsing: 'J 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("EVANGELIUM PODLE JANA 1:1").osis()).toEqual("John.1.1", "parsing: 'EVANGELIUM PODLE JANA 1:1'")
		expect(p.parse("JANOVO EVANGELIUM 1:1").osis()).toEqual("John.1.1", "parsing: 'JANOVO EVANGELIUM 1:1'")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1", "parsing: 'JOHN 1:1'")
		expect(p.parse("JAN 1:1").osis()).toEqual("John.1.1", "parsing: 'JAN 1:1'")
		expect(p.parse("J 1:1").osis()).toEqual("John.1.1", "parsing: 'J 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Acts (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Acts (cs)", function() {
      
		expect(p.parse("Skutky apostolske 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Skutky apostolske 1:1'")
		expect(p.parse("Skutky apostolské 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Skutky apostolské 1:1'")
		expect(p.parse("Skutky apoštolske 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Skutky apoštolske 1:1'")
		expect(p.parse("Skutky apoštolské 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Skutky apoštolské 1:1'")
		expect(p.parse("Skutky apostolu 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Skutky apostolu 1:1'")
		expect(p.parse("Skutky apostolü 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Skutky apostolü 1:1'")
		expect(p.parse("Skutky apostolů 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Skutky apostolů 1:1'")
		expect(p.parse("Skutky apoštolu 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Skutky apoštolu 1:1'")
		expect(p.parse("Skutky apoštolü 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Skutky apoštolü 1:1'")
		expect(p.parse("Skutky apoštolů 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Skutky apoštolů 1:1'")
		expect(p.parse("Skutky 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Skutky 1:1'")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Acts 1:1'")
		expect(p.parse("Sk 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Sk 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("SKUTKY APOSTOLSKE 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SKUTKY APOSTOLSKE 1:1'")
		expect(p.parse("SKUTKY APOSTOLSKÉ 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SKUTKY APOSTOLSKÉ 1:1'")
		expect(p.parse("SKUTKY APOŠTOLSKE 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SKUTKY APOŠTOLSKE 1:1'")
		expect(p.parse("SKUTKY APOŠTOLSKÉ 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SKUTKY APOŠTOLSKÉ 1:1'")
		expect(p.parse("SKUTKY APOSTOLU 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SKUTKY APOSTOLU 1:1'")
		expect(p.parse("SKUTKY APOSTOLÜ 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SKUTKY APOSTOLÜ 1:1'")
		expect(p.parse("SKUTKY APOSTOLŮ 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SKUTKY APOSTOLŮ 1:1'")
		expect(p.parse("SKUTKY APOŠTOLU 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SKUTKY APOŠTOLU 1:1'")
		expect(p.parse("SKUTKY APOŠTOLÜ 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SKUTKY APOŠTOLÜ 1:1'")
		expect(p.parse("SKUTKY APOŠTOLŮ 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SKUTKY APOŠTOLŮ 1:1'")
		expect(p.parse("SKUTKY 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SKUTKY 1:1'")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1", "parsing: 'ACTS 1:1'")
		expect(p.parse("SK 1:1").osis()).toEqual("Acts.1.1", "parsing: 'SK 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Rom (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rom (cs)", function() {
      
		expect(p.parse("List Rimanum 1:1").osis()).toEqual("Rom.1.1", "parsing: 'List Rimanum 1:1'")
		expect(p.parse("List Rimanům 1:1").osis()).toEqual("Rom.1.1", "parsing: 'List Rimanům 1:1'")
		expect(p.parse("List Rímanum 1:1").osis()).toEqual("Rom.1.1", "parsing: 'List Rímanum 1:1'")
		expect(p.parse("List Rímanům 1:1").osis()).toEqual("Rom.1.1", "parsing: 'List Rímanům 1:1'")
		expect(p.parse("List Řimanum 1:1").osis()).toEqual("Rom.1.1", "parsing: 'List Řimanum 1:1'")
		expect(p.parse("List Řimanům 1:1").osis()).toEqual("Rom.1.1", "parsing: 'List Řimanům 1:1'")
		expect(p.parse("List Římanum 1:1").osis()).toEqual("Rom.1.1", "parsing: 'List Římanum 1:1'")
		expect(p.parse("List Římanům 1:1").osis()).toEqual("Rom.1.1", "parsing: 'List Římanům 1:1'")
		expect(p.parse("Rimanum 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Rimanum 1:1'")
		expect(p.parse("Rimanům 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Rimanům 1:1'")
		expect(p.parse("Rímanum 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Rímanum 1:1'")
		expect(p.parse("Rímanům 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Rímanům 1:1'")
		expect(p.parse("Řimanum 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Řimanum 1:1'")
		expect(p.parse("Řimanům 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Řimanům 1:1'")
		expect(p.parse("Římanum 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Římanum 1:1'")
		expect(p.parse("Římanům 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Římanům 1:1'")
		expect(p.parse("Rim 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Rim 1:1'")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Rom 1:1'")
		expect(p.parse("Rím 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Rím 1:1'")
		expect(p.parse("Řim 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Řim 1:1'")
		expect(p.parse("Řím 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Řím 1:1'")
		expect(p.parse("R 1:1").osis()).toEqual("Rom.1.1", "parsing: 'R 1:1'")
		expect(p.parse("Ř 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Ř 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("LIST RIMANUM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'LIST RIMANUM 1:1'")
		expect(p.parse("LIST RIMANŮM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'LIST RIMANŮM 1:1'")
		expect(p.parse("LIST RÍMANUM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'LIST RÍMANUM 1:1'")
		expect(p.parse("LIST RÍMANŮM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'LIST RÍMANŮM 1:1'")
		expect(p.parse("LIST ŘIMANUM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'LIST ŘIMANUM 1:1'")
		expect(p.parse("LIST ŘIMANŮM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'LIST ŘIMANŮM 1:1'")
		expect(p.parse("LIST ŘÍMANUM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'LIST ŘÍMANUM 1:1'")
		expect(p.parse("LIST ŘÍMANŮM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'LIST ŘÍMANŮM 1:1'")
		expect(p.parse("RIMANUM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'RIMANUM 1:1'")
		expect(p.parse("RIMANŮM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'RIMANŮM 1:1'")
		expect(p.parse("RÍMANUM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'RÍMANUM 1:1'")
		expect(p.parse("RÍMANŮM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'RÍMANŮM 1:1'")
		expect(p.parse("ŘIMANUM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'ŘIMANUM 1:1'")
		expect(p.parse("ŘIMANŮM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'ŘIMANŮM 1:1'")
		expect(p.parse("ŘÍMANUM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'ŘÍMANUM 1:1'")
		expect(p.parse("ŘÍMANŮM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'ŘÍMANŮM 1:1'")
		expect(p.parse("RIM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'RIM 1:1'")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'ROM 1:1'")
		expect(p.parse("RÍM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'RÍM 1:1'")
		expect(p.parse("ŘIM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'ŘIM 1:1'")
		expect(p.parse("ŘÍM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'ŘÍM 1:1'")
		expect(p.parse("R 1:1").osis()).toEqual("Rom.1.1", "parsing: 'R 1:1'")
		expect(p.parse("Ř 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Ř 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Cor (cs)", function() {
      
		expect(p.parse("Druha list Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druha list Korintskym 1:1'")
		expect(p.parse("Druha list Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druha list Korintským 1:1'")
		expect(p.parse("Druhy list Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhy list Korintskym 1:1'")
		expect(p.parse("Druhy list Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhy list Korintským 1:1'")
		expect(p.parse("Druhá list Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhá list Korintskym 1:1'")
		expect(p.parse("Druhá list Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhá list Korintským 1:1'")
		expect(p.parse("Druhý list Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhý list Korintskym 1:1'")
		expect(p.parse("Druhý list Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhý list Korintským 1:1'")
		expect(p.parse("Druha list Korinskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druha list Korinskym 1:1'")
		expect(p.parse("Druha list Korinským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druha list Korinským 1:1'")
		expect(p.parse("Druhy list Korinskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhy list Korinskym 1:1'")
		expect(p.parse("Druhy list Korinským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhy list Korinským 1:1'")
		expect(p.parse("Druhá list Korinskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhá list Korinskym 1:1'")
		expect(p.parse("Druhá list Korinským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhá list Korinským 1:1'")
		expect(p.parse("Druhý list Korinskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhý list Korinskym 1:1'")
		expect(p.parse("Druhý list Korinským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhý list Korinským 1:1'")
		expect(p.parse("II. list Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. list Korintskym 1:1'")
		expect(p.parse("II. list Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. list Korintským 1:1'")
		expect(p.parse("2. list Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. list Korintskym 1:1'")
		expect(p.parse("2. list Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. list Korintským 1:1'")
		expect(p.parse("II list Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II list Korintskym 1:1'")
		expect(p.parse("II list Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II list Korintským 1:1'")
		expect(p.parse("II. list Korinskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. list Korinskym 1:1'")
		expect(p.parse("II. list Korinským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. list Korinským 1:1'")
		expect(p.parse("2 list Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 list Korintskym 1:1'")
		expect(p.parse("2 list Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 list Korintským 1:1'")
		expect(p.parse("2. list Korinskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. list Korinskym 1:1'")
		expect(p.parse("2. list Korinským 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. list Korinským 1:1'")
		expect(p.parse("II list Korinskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II list Korinskym 1:1'")
		expect(p.parse("II list Korinským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II list Korinským 1:1'")
		expect(p.parse("2 list Korinskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 list Korinskym 1:1'")
		expect(p.parse("2 list Korinským 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 list Korinským 1:1'")
		expect(p.parse("Druha Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druha Korintskym 1:1'")
		expect(p.parse("Druha Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druha Korintským 1:1'")
		expect(p.parse("Druhy Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhy Korintskym 1:1'")
		expect(p.parse("Druhy Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhy Korintským 1:1'")
		expect(p.parse("Druhá Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhá Korintskym 1:1'")
		expect(p.parse("Druhá Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhá Korintským 1:1'")
		expect(p.parse("Druhý Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhý Korintskym 1:1'")
		expect(p.parse("Druhý Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhý Korintským 1:1'")
		expect(p.parse("II. Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. Korintskym 1:1'")
		expect(p.parse("II. Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. Korintským 1:1'")
		expect(p.parse("2. Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. Korintskym 1:1'")
		expect(p.parse("2. Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. Korintským 1:1'")
		expect(p.parse("II Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II Korintskym 1:1'")
		expect(p.parse("II Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II Korintským 1:1'")
		expect(p.parse("2 Korintskym 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 Korintskym 1:1'")
		expect(p.parse("2 Korintským 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 Korintským 1:1'")
		expect(p.parse("Druha K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druha K 1:1'")
		expect(p.parse("Druhy K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhy K 1:1'")
		expect(p.parse("Druhá K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhá K 1:1'")
		expect(p.parse("Druhý K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Druhý K 1:1'")
		expect(p.parse("DruhaK 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DruhaK 1:1'")
		expect(p.parse("DruhyK 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DruhyK 1:1'")
		expect(p.parse("DruháK 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DruháK 1:1'")
		expect(p.parse("DruhýK 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DruhýK 1:1'")
		expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 Kor 1:1'")
		expect(p.parse("II. K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. K 1:1'")
		expect(p.parse("2. K 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. K 1:1'")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2Cor 1:1'")
		expect(p.parse("2Kor 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2Kor 1:1'")
		expect(p.parse("II K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II K 1:1'")
		expect(p.parse("II.K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II.K 1:1'")
		expect(p.parse("2 K 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 K 1:1'")
		expect(p.parse("2.K 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.K 1:1'")
		expect(p.parse("IIK 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'IIK 1:1'")
		expect(p.parse("2K 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2K 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("DRUHA LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHA LIST KORINTSKYM 1:1'")
		expect(p.parse("DRUHA LIST KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHA LIST KORINTSKÝM 1:1'")
		expect(p.parse("DRUHY LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHY LIST KORINTSKYM 1:1'")
		expect(p.parse("DRUHY LIST KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHY LIST KORINTSKÝM 1:1'")
		expect(p.parse("DRUHÁ LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÁ LIST KORINTSKYM 1:1'")
		expect(p.parse("DRUHÁ LIST KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÁ LIST KORINTSKÝM 1:1'")
		expect(p.parse("DRUHÝ LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÝ LIST KORINTSKYM 1:1'")
		expect(p.parse("DRUHÝ LIST KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÝ LIST KORINTSKÝM 1:1'")
		expect(p.parse("DRUHA LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHA LIST KORINSKYM 1:1'")
		expect(p.parse("DRUHA LIST KORINSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHA LIST KORINSKÝM 1:1'")
		expect(p.parse("DRUHY LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHY LIST KORINSKYM 1:1'")
		expect(p.parse("DRUHY LIST KORINSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHY LIST KORINSKÝM 1:1'")
		expect(p.parse("DRUHÁ LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÁ LIST KORINSKYM 1:1'")
		expect(p.parse("DRUHÁ LIST KORINSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÁ LIST KORINSKÝM 1:1'")
		expect(p.parse("DRUHÝ LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÝ LIST KORINSKYM 1:1'")
		expect(p.parse("DRUHÝ LIST KORINSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÝ LIST KORINSKÝM 1:1'")
		expect(p.parse("II. LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. LIST KORINTSKYM 1:1'")
		expect(p.parse("II. LIST KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. LIST KORINTSKÝM 1:1'")
		expect(p.parse("2. LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. LIST KORINTSKYM 1:1'")
		expect(p.parse("2. LIST KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. LIST KORINTSKÝM 1:1'")
		expect(p.parse("II LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II LIST KORINTSKYM 1:1'")
		expect(p.parse("II LIST KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II LIST KORINTSKÝM 1:1'")
		expect(p.parse("II. LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. LIST KORINSKYM 1:1'")
		expect(p.parse("II. LIST KORINSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. LIST KORINSKÝM 1:1'")
		expect(p.parse("2 LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 LIST KORINTSKYM 1:1'")
		expect(p.parse("2 LIST KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 LIST KORINTSKÝM 1:1'")
		expect(p.parse("2. LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. LIST KORINSKYM 1:1'")
		expect(p.parse("2. LIST KORINSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. LIST KORINSKÝM 1:1'")
		expect(p.parse("II LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II LIST KORINSKYM 1:1'")
		expect(p.parse("II LIST KORINSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II LIST KORINSKÝM 1:1'")
		expect(p.parse("2 LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 LIST KORINSKYM 1:1'")
		expect(p.parse("2 LIST KORINSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 LIST KORINSKÝM 1:1'")
		expect(p.parse("DRUHA KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHA KORINTSKYM 1:1'")
		expect(p.parse("DRUHA KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHA KORINTSKÝM 1:1'")
		expect(p.parse("DRUHY KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHY KORINTSKYM 1:1'")
		expect(p.parse("DRUHY KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHY KORINTSKÝM 1:1'")
		expect(p.parse("DRUHÁ KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÁ KORINTSKYM 1:1'")
		expect(p.parse("DRUHÁ KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÁ KORINTSKÝM 1:1'")
		expect(p.parse("DRUHÝ KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÝ KORINTSKYM 1:1'")
		expect(p.parse("DRUHÝ KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÝ KORINTSKÝM 1:1'")
		expect(p.parse("II. KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. KORINTSKYM 1:1'")
		expect(p.parse("II. KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. KORINTSKÝM 1:1'")
		expect(p.parse("2. KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. KORINTSKYM 1:1'")
		expect(p.parse("2. KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. KORINTSKÝM 1:1'")
		expect(p.parse("II KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II KORINTSKYM 1:1'")
		expect(p.parse("II KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II KORINTSKÝM 1:1'")
		expect(p.parse("2 KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 KORINTSKYM 1:1'")
		expect(p.parse("2 KORINTSKÝM 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 KORINTSKÝM 1:1'")
		expect(p.parse("DRUHA K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHA K 1:1'")
		expect(p.parse("DRUHY K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHY K 1:1'")
		expect(p.parse("DRUHÁ K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÁ K 1:1'")
		expect(p.parse("DRUHÝ K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÝ K 1:1'")
		expect(p.parse("DRUHAK 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHAK 1:1'")
		expect(p.parse("DRUHYK 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHYK 1:1'")
		expect(p.parse("DRUHÁK 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÁK 1:1'")
		expect(p.parse("DRUHÝK 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'DRUHÝK 1:1'")
		expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 KOR 1:1'")
		expect(p.parse("II. K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. K 1:1'")
		expect(p.parse("2. K 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. K 1:1'")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2COR 1:1'")
		expect(p.parse("2KOR 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2KOR 1:1'")
		expect(p.parse("II K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II K 1:1'")
		expect(p.parse("II.K 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II.K 1:1'")
		expect(p.parse("2 K 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 K 1:1'")
		expect(p.parse("2.K 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.K 1:1'")
		expect(p.parse("IIK 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'IIK 1:1'")
		expect(p.parse("2K 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2K 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Cor (cs)", function() {
      
		expect(p.parse("Prvni list Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Prvni list Korintskym 1:1'")
		expect(p.parse("Prvni list Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Prvni list Korintským 1:1'")
		expect(p.parse("První list Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'První list Korintskym 1:1'")
		expect(p.parse("První list Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'První list Korintským 1:1'")
		expect(p.parse("Prvni list Korinskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Prvni list Korinskym 1:1'")
		expect(p.parse("Prvni list Korinským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Prvni list Korinským 1:1'")
		expect(p.parse("První list Korinskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'První list Korinskym 1:1'")
		expect(p.parse("První list Korinským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'První list Korinským 1:1'")
		expect(p.parse("1. list Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. list Korintskym 1:1'")
		expect(p.parse("1. list Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. list Korintským 1:1'")
		expect(p.parse("I. list Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. list Korintskym 1:1'")
		expect(p.parse("I. list Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. list Korintským 1:1'")
		expect(p.parse("1 list Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 list Korintskym 1:1'")
		expect(p.parse("1 list Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 list Korintským 1:1'")
		expect(p.parse("1. list Korinskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. list Korinskym 1:1'")
		expect(p.parse("1. list Korinským 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. list Korinským 1:1'")
		expect(p.parse("I list Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I list Korintskym 1:1'")
		expect(p.parse("I list Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I list Korintským 1:1'")
		expect(p.parse("I. list Korinskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. list Korinskym 1:1'")
		expect(p.parse("I. list Korinským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. list Korinským 1:1'")
		expect(p.parse("1 list Korinskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 list Korinskym 1:1'")
		expect(p.parse("1 list Korinským 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 list Korinským 1:1'")
		expect(p.parse("I list Korinskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I list Korinskym 1:1'")
		expect(p.parse("I list Korinským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I list Korinským 1:1'")
		expect(p.parse("Prvni Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Prvni Korintskym 1:1'")
		expect(p.parse("Prvni Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Prvni Korintským 1:1'")
		expect(p.parse("První Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'První Korintskym 1:1'")
		expect(p.parse("První Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'První Korintským 1:1'")
		expect(p.parse("1. Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. Korintskym 1:1'")
		expect(p.parse("1. Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. Korintským 1:1'")
		expect(p.parse("I. Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. Korintskym 1:1'")
		expect(p.parse("I. Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. Korintským 1:1'")
		expect(p.parse("1 Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 Korintskym 1:1'")
		expect(p.parse("1 Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 Korintským 1:1'")
		expect(p.parse("I Korintskym 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I Korintskym 1:1'")
		expect(p.parse("I Korintským 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I Korintským 1:1'")
		expect(p.parse("Prvni Kor 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Prvni Kor 1:1'")
		expect(p.parse("První Kor 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'První Kor 1:1'")
		expect(p.parse("Prvni K 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Prvni K 1:1'")
		expect(p.parse("První K 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'První K 1:1'")
		expect(p.parse("1. Kor 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. Kor 1:1'")
		expect(p.parse("I. Kor 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. Kor 1:1'")
		expect(p.parse("PrvniK 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PrvniK 1:1'")
		expect(p.parse("PrvníK 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PrvníK 1:1'")
		expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 Kor 1:1'")
		expect(p.parse("I Kor 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I Kor 1:1'")
		expect(p.parse("1. K 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. K 1:1'")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1Cor 1:1'")
		expect(p.parse("I. K 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. K 1:1'")
		expect(p.parse("1 K 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 K 1:1'")
		expect(p.parse("1.K 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.K 1:1'")
		expect(p.parse("I K 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I K 1:1'")
		expect(p.parse("I.K 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I.K 1:1'")
		expect(p.parse("1K 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1K 1:1'")
		expect(p.parse("IK 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'IK 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PRVNI LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNI LIST KORINTSKYM 1:1'")
		expect(p.parse("PRVNI LIST KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNI LIST KORINTSKÝM 1:1'")
		expect(p.parse("PRVNÍ LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNÍ LIST KORINTSKYM 1:1'")
		expect(p.parse("PRVNÍ LIST KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNÍ LIST KORINTSKÝM 1:1'")
		expect(p.parse("PRVNI LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNI LIST KORINSKYM 1:1'")
		expect(p.parse("PRVNI LIST KORINSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNI LIST KORINSKÝM 1:1'")
		expect(p.parse("PRVNÍ LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNÍ LIST KORINSKYM 1:1'")
		expect(p.parse("PRVNÍ LIST KORINSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNÍ LIST KORINSKÝM 1:1'")
		expect(p.parse("1. LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. LIST KORINTSKYM 1:1'")
		expect(p.parse("1. LIST KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. LIST KORINTSKÝM 1:1'")
		expect(p.parse("I. LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. LIST KORINTSKYM 1:1'")
		expect(p.parse("I. LIST KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. LIST KORINTSKÝM 1:1'")
		expect(p.parse("1 LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 LIST KORINTSKYM 1:1'")
		expect(p.parse("1 LIST KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 LIST KORINTSKÝM 1:1'")
		expect(p.parse("1. LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. LIST KORINSKYM 1:1'")
		expect(p.parse("1. LIST KORINSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. LIST KORINSKÝM 1:1'")
		expect(p.parse("I LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I LIST KORINTSKYM 1:1'")
		expect(p.parse("I LIST KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I LIST KORINTSKÝM 1:1'")
		expect(p.parse("I. LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. LIST KORINSKYM 1:1'")
		expect(p.parse("I. LIST KORINSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. LIST KORINSKÝM 1:1'")
		expect(p.parse("1 LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 LIST KORINSKYM 1:1'")
		expect(p.parse("1 LIST KORINSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 LIST KORINSKÝM 1:1'")
		expect(p.parse("I LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I LIST KORINSKYM 1:1'")
		expect(p.parse("I LIST KORINSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I LIST KORINSKÝM 1:1'")
		expect(p.parse("PRVNI KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNI KORINTSKYM 1:1'")
		expect(p.parse("PRVNI KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNI KORINTSKÝM 1:1'")
		expect(p.parse("PRVNÍ KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNÍ KORINTSKYM 1:1'")
		expect(p.parse("PRVNÍ KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNÍ KORINTSKÝM 1:1'")
		expect(p.parse("1. KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. KORINTSKYM 1:1'")
		expect(p.parse("1. KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. KORINTSKÝM 1:1'")
		expect(p.parse("I. KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. KORINTSKYM 1:1'")
		expect(p.parse("I. KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. KORINTSKÝM 1:1'")
		expect(p.parse("1 KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 KORINTSKYM 1:1'")
		expect(p.parse("1 KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 KORINTSKÝM 1:1'")
		expect(p.parse("I KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I KORINTSKYM 1:1'")
		expect(p.parse("I KORINTSKÝM 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I KORINTSKÝM 1:1'")
		expect(p.parse("PRVNI KOR 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNI KOR 1:1'")
		expect(p.parse("PRVNÍ KOR 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNÍ KOR 1:1'")
		expect(p.parse("PRVNI K 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNI K 1:1'")
		expect(p.parse("PRVNÍ K 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNÍ K 1:1'")
		expect(p.parse("1. KOR 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. KOR 1:1'")
		expect(p.parse("I. KOR 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. KOR 1:1'")
		expect(p.parse("PRVNIK 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNIK 1:1'")
		expect(p.parse("PRVNÍK 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'PRVNÍK 1:1'")
		expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 KOR 1:1'")
		expect(p.parse("I KOR 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I KOR 1:1'")
		expect(p.parse("1. K 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. K 1:1'")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1COR 1:1'")
		expect(p.parse("I. K 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. K 1:1'")
		expect(p.parse("1 K 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 K 1:1'")
		expect(p.parse("1.K 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.K 1:1'")
		expect(p.parse("I K 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I K 1:1'")
		expect(p.parse("I.K 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I.K 1:1'")
		expect(p.parse("1K 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1K 1:1'")
		expect(p.parse("IK 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'IK 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Gal (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gal (cs)", function() {
      
		expect(p.parse("List Galatskym 1:1").osis()).toEqual("Gal.1.1", "parsing: 'List Galatskym 1:1'")
		expect(p.parse("List Galatským 1:1").osis()).toEqual("Gal.1.1", "parsing: 'List Galatským 1:1'")
		expect(p.parse("Galatskym 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Galatskym 1:1'")
		expect(p.parse("Galatským 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Galatským 1:1'")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Gal 1:1'")
		expect(p.parse("Ga 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Ga 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("LIST GALATSKYM 1:1").osis()).toEqual("Gal.1.1", "parsing: 'LIST GALATSKYM 1:1'")
		expect(p.parse("LIST GALATSKÝM 1:1").osis()).toEqual("Gal.1.1", "parsing: 'LIST GALATSKÝM 1:1'")
		expect(p.parse("GALATSKYM 1:1").osis()).toEqual("Gal.1.1", "parsing: 'GALATSKYM 1:1'")
		expect(p.parse("GALATSKÝM 1:1").osis()).toEqual("Gal.1.1", "parsing: 'GALATSKÝM 1:1'")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1", "parsing: 'GAL 1:1'")
		expect(p.parse("GA 1:1").osis()).toEqual("Gal.1.1", "parsing: 'GA 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Eph (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eph (cs)", function() {
      
		expect(p.parse("List Efezanum 1:1").osis()).toEqual("Eph.1.1", "parsing: 'List Efezanum 1:1'")
		expect(p.parse("List Efezanům 1:1").osis()).toEqual("Eph.1.1", "parsing: 'List Efezanům 1:1'")
		expect(p.parse("List Efezskym 1:1").osis()).toEqual("Eph.1.1", "parsing: 'List Efezskym 1:1'")
		expect(p.parse("List Efezským 1:1").osis()).toEqual("Eph.1.1", "parsing: 'List Efezským 1:1'")
		expect(p.parse("List Efézskym 1:1").osis()).toEqual("Eph.1.1", "parsing: 'List Efézskym 1:1'")
		expect(p.parse("List Efézským 1:1").osis()).toEqual("Eph.1.1", "parsing: 'List Efézským 1:1'")
		expect(p.parse("Efezskym 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Efezskym 1:1'")
		expect(p.parse("Efezským 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Efezským 1:1'")
		expect(p.parse("Efeskym 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Efeskym 1:1'")
		expect(p.parse("Efeským 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Efeským 1:1'")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Eph 1:1'")
		expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Ef 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("LIST EFEZANUM 1:1").osis()).toEqual("Eph.1.1", "parsing: 'LIST EFEZANUM 1:1'")
		expect(p.parse("LIST EFEZANŮM 1:1").osis()).toEqual("Eph.1.1", "parsing: 'LIST EFEZANŮM 1:1'")
		expect(p.parse("LIST EFEZSKYM 1:1").osis()).toEqual("Eph.1.1", "parsing: 'LIST EFEZSKYM 1:1'")
		expect(p.parse("LIST EFEZSKÝM 1:1").osis()).toEqual("Eph.1.1", "parsing: 'LIST EFEZSKÝM 1:1'")
		expect(p.parse("LIST EFÉZSKYM 1:1").osis()).toEqual("Eph.1.1", "parsing: 'LIST EFÉZSKYM 1:1'")
		expect(p.parse("LIST EFÉZSKÝM 1:1").osis()).toEqual("Eph.1.1", "parsing: 'LIST EFÉZSKÝM 1:1'")
		expect(p.parse("EFEZSKYM 1:1").osis()).toEqual("Eph.1.1", "parsing: 'EFEZSKYM 1:1'")
		expect(p.parse("EFEZSKÝM 1:1").osis()).toEqual("Eph.1.1", "parsing: 'EFEZSKÝM 1:1'")
		expect(p.parse("EFESKYM 1:1").osis()).toEqual("Eph.1.1", "parsing: 'EFESKYM 1:1'")
		expect(p.parse("EFESKÝM 1:1").osis()).toEqual("Eph.1.1", "parsing: 'EFESKÝM 1:1'")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1", "parsing: 'EPH 1:1'")
		expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1", "parsing: 'EF 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Phil (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phil (cs)", function() {
      
		expect(p.parse("List Filipskym 1:1").osis()).toEqual("Phil.1.1", "parsing: 'List Filipskym 1:1'")
		expect(p.parse("List Filipským 1:1").osis()).toEqual("Phil.1.1", "parsing: 'List Filipským 1:1'")
		expect(p.parse("Filipenskym 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Filipenskym 1:1'")
		expect(p.parse("Filipenským 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Filipenským 1:1'")
		expect(p.parse("Filipskym 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Filipskym 1:1'")
		expect(p.parse("Filipským 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Filipským 1:1'")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Phil 1:1'")
		expect(p.parse("Flp 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Flp 1:1'")
		expect(p.parse("Fp 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Fp 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("LIST FILIPSKYM 1:1").osis()).toEqual("Phil.1.1", "parsing: 'LIST FILIPSKYM 1:1'")
		expect(p.parse("LIST FILIPSKÝM 1:1").osis()).toEqual("Phil.1.1", "parsing: 'LIST FILIPSKÝM 1:1'")
		expect(p.parse("FILIPENSKYM 1:1").osis()).toEqual("Phil.1.1", "parsing: 'FILIPENSKYM 1:1'")
		expect(p.parse("FILIPENSKÝM 1:1").osis()).toEqual("Phil.1.1", "parsing: 'FILIPENSKÝM 1:1'")
		expect(p.parse("FILIPSKYM 1:1").osis()).toEqual("Phil.1.1", "parsing: 'FILIPSKYM 1:1'")
		expect(p.parse("FILIPSKÝM 1:1").osis()).toEqual("Phil.1.1", "parsing: 'FILIPSKÝM 1:1'")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1", "parsing: 'PHIL 1:1'")
		expect(p.parse("FLP 1:1").osis()).toEqual("Phil.1.1", "parsing: 'FLP 1:1'")
		expect(p.parse("FP 1:1").osis()).toEqual("Phil.1.1", "parsing: 'FP 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Col (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Col (cs)", function() {
      
		expect(p.parse("List Kolosanum 1:1").osis()).toEqual("Col.1.1", "parsing: 'List Kolosanum 1:1'")
		expect(p.parse("List Kolosanům 1:1").osis()).toEqual("Col.1.1", "parsing: 'List Kolosanům 1:1'")
		expect(p.parse("List Koloskym 1:1").osis()).toEqual("Col.1.1", "parsing: 'List Koloskym 1:1'")
		expect(p.parse("List Koloským 1:1").osis()).toEqual("Col.1.1", "parsing: 'List Koloským 1:1'")
		expect(p.parse("Kolossenskym 1:1").osis()).toEqual("Col.1.1", "parsing: 'Kolossenskym 1:1'")
		expect(p.parse("Kolossenským 1:1").osis()).toEqual("Col.1.1", "parsing: 'Kolossenským 1:1'")
		expect(p.parse("Kolosenskym 1:1").osis()).toEqual("Col.1.1", "parsing: 'Kolosenskym 1:1'")
		expect(p.parse("Kolosenským 1:1").osis()).toEqual("Col.1.1", "parsing: 'Kolosenským 1:1'")
		expect(p.parse("Kolosanum 1:1").osis()).toEqual("Col.1.1", "parsing: 'Kolosanum 1:1'")
		expect(p.parse("Kolosanům 1:1").osis()).toEqual("Col.1.1", "parsing: 'Kolosanům 1:1'")
		expect(p.parse("Koloskym 1:1").osis()).toEqual("Col.1.1", "parsing: 'Koloskym 1:1'")
		expect(p.parse("Koloským 1:1").osis()).toEqual("Col.1.1", "parsing: 'Koloským 1:1'")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1", "parsing: 'Col 1:1'")
		expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1", "parsing: 'Kol 1:1'")
		expect(p.parse("Ko 1:1").osis()).toEqual("Col.1.1", "parsing: 'Ko 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("LIST KOLOSANUM 1:1").osis()).toEqual("Col.1.1", "parsing: 'LIST KOLOSANUM 1:1'")
		expect(p.parse("LIST KOLOSANŮM 1:1").osis()).toEqual("Col.1.1", "parsing: 'LIST KOLOSANŮM 1:1'")
		expect(p.parse("LIST KOLOSKYM 1:1").osis()).toEqual("Col.1.1", "parsing: 'LIST KOLOSKYM 1:1'")
		expect(p.parse("LIST KOLOSKÝM 1:1").osis()).toEqual("Col.1.1", "parsing: 'LIST KOLOSKÝM 1:1'")
		expect(p.parse("KOLOSSENSKYM 1:1").osis()).toEqual("Col.1.1", "parsing: 'KOLOSSENSKYM 1:1'")
		expect(p.parse("KOLOSSENSKÝM 1:1").osis()).toEqual("Col.1.1", "parsing: 'KOLOSSENSKÝM 1:1'")
		expect(p.parse("KOLOSENSKYM 1:1").osis()).toEqual("Col.1.1", "parsing: 'KOLOSENSKYM 1:1'")
		expect(p.parse("KOLOSENSKÝM 1:1").osis()).toEqual("Col.1.1", "parsing: 'KOLOSENSKÝM 1:1'")
		expect(p.parse("KOLOSANUM 1:1").osis()).toEqual("Col.1.1", "parsing: 'KOLOSANUM 1:1'")
		expect(p.parse("KOLOSANŮM 1:1").osis()).toEqual("Col.1.1", "parsing: 'KOLOSANŮM 1:1'")
		expect(p.parse("KOLOSKYM 1:1").osis()).toEqual("Col.1.1", "parsing: 'KOLOSKYM 1:1'")
		expect(p.parse("KOLOSKÝM 1:1").osis()).toEqual("Col.1.1", "parsing: 'KOLOSKÝM 1:1'")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1", "parsing: 'COL 1:1'")
		expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1", "parsing: 'KOL 1:1'")
		expect(p.parse("KO 1:1").osis()).toEqual("Col.1.1", "parsing: 'KO 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Thess (cs)", function() {
      
		expect(p.parse("Druha list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha list Tesalonickym 1:1'")
		expect(p.parse("Druha list Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha list Tesalonickým 1:1'")
		expect(p.parse("Druhy list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy list Tesalonickym 1:1'")
		expect(p.parse("Druhy list Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy list Tesalonickým 1:1'")
		expect(p.parse("Druhá list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá list Tesalonickym 1:1'")
		expect(p.parse("Druhá list Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá list Tesalonickým 1:1'")
		expect(p.parse("Druhý list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý list Tesalonickym 1:1'")
		expect(p.parse("Druhý list Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý list Tesalonickým 1:1'")
		expect(p.parse("Druha Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha Tessalonicenskym 1:1'")
		expect(p.parse("Druha Tessalonicenským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha Tessalonicenským 1:1'")
		expect(p.parse("Druhy Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy Tessalonicenskym 1:1'")
		expect(p.parse("Druhy Tessalonicenským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy Tessalonicenským 1:1'")
		expect(p.parse("Druhá Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá Tessalonicenskym 1:1'")
		expect(p.parse("Druhá Tessalonicenským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá Tessalonicenským 1:1'")
		expect(p.parse("Druhý Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý Tessalonicenskym 1:1'")
		expect(p.parse("Druhý Tessalonicenským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý Tessalonicenským 1:1'")
		expect(p.parse("II. list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. list Tesalonickym 1:1'")
		expect(p.parse("II. list Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. list Tesalonickým 1:1'")
		expect(p.parse("2. list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. list Tesalonickym 1:1'")
		expect(p.parse("2. list Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. list Tesalonickým 1:1'")
		expect(p.parse("Druha list Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha list Solunskym 1:1'")
		expect(p.parse("Druha list Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha list Solunským 1:1'")
		expect(p.parse("Druha list Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha list Soluňskym 1:1'")
		expect(p.parse("Druha list Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha list Soluňským 1:1'")
		expect(p.parse("Druhy list Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy list Solunskym 1:1'")
		expect(p.parse("Druhy list Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy list Solunským 1:1'")
		expect(p.parse("Druhy list Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy list Soluňskym 1:1'")
		expect(p.parse("Druhy list Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy list Soluňským 1:1'")
		expect(p.parse("Druhá list Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá list Solunskym 1:1'")
		expect(p.parse("Druhá list Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá list Solunským 1:1'")
		expect(p.parse("Druhá list Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá list Soluňskym 1:1'")
		expect(p.parse("Druhá list Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá list Soluňským 1:1'")
		expect(p.parse("Druhý list Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý list Solunskym 1:1'")
		expect(p.parse("Druhý list Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý list Solunským 1:1'")
		expect(p.parse("Druhý list Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý list Soluňskym 1:1'")
		expect(p.parse("Druhý list Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý list Soluňským 1:1'")
		expect(p.parse("II list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II list Tesalonickym 1:1'")
		expect(p.parse("II list Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II list Tesalonickým 1:1'")
		expect(p.parse("II. Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Tessalonicenskym 1:1'")
		expect(p.parse("II. Tessalonicenským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Tessalonicenským 1:1'")
		expect(p.parse("2 list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 list Tesalonickym 1:1'")
		expect(p.parse("2 list Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 list Tesalonickým 1:1'")
		expect(p.parse("2. Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Tessalonicenskym 1:1'")
		expect(p.parse("2. Tessalonicenským 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Tessalonicenským 1:1'")
		expect(p.parse("II Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Tessalonicenskym 1:1'")
		expect(p.parse("II Tessalonicenským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Tessalonicenským 1:1'")
		expect(p.parse("2 Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Tessalonicenskym 1:1'")
		expect(p.parse("2 Tessalonicenským 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Tessalonicenským 1:1'")
		expect(p.parse("Druha Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha Tesalonickym 1:1'")
		expect(p.parse("Druha Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha Tesalonickým 1:1'")
		expect(p.parse("Druhy Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy Tesalonickym 1:1'")
		expect(p.parse("Druhy Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy Tesalonickým 1:1'")
		expect(p.parse("Druhá Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá Tesalonickym 1:1'")
		expect(p.parse("Druhá Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá Tesalonickým 1:1'")
		expect(p.parse("Druhý Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý Tesalonickym 1:1'")
		expect(p.parse("Druhý Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý Tesalonickým 1:1'")
		expect(p.parse("II. list Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. list Solunskym 1:1'")
		expect(p.parse("II. list Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. list Solunským 1:1'")
		expect(p.parse("II. list Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. list Soluňskym 1:1'")
		expect(p.parse("II. list Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. list Soluňským 1:1'")
		expect(p.parse("2. list Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. list Solunskym 1:1'")
		expect(p.parse("2. list Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. list Solunským 1:1'")
		expect(p.parse("2. list Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. list Soluňskym 1:1'")
		expect(p.parse("2. list Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. list Soluňským 1:1'")
		expect(p.parse("II list Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II list Solunskym 1:1'")
		expect(p.parse("II list Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II list Solunským 1:1'")
		expect(p.parse("II list Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II list Soluňskym 1:1'")
		expect(p.parse("II list Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II list Soluňským 1:1'")
		expect(p.parse("2 list Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 list Solunskym 1:1'")
		expect(p.parse("2 list Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 list Solunským 1:1'")
		expect(p.parse("2 list Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 list Soluňskym 1:1'")
		expect(p.parse("2 list Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 list Soluňským 1:1'")
		expect(p.parse("II. Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Tesalonickym 1:1'")
		expect(p.parse("II. Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Tesalonickým 1:1'")
		expect(p.parse("2. Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Tesalonickym 1:1'")
		expect(p.parse("2. Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Tesalonickým 1:1'")
		expect(p.parse("Druha Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha Solunskym 1:1'")
		expect(p.parse("Druha Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha Solunským 1:1'")
		expect(p.parse("Druha Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha Soluňskym 1:1'")
		expect(p.parse("Druha Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha Soluňským 1:1'")
		expect(p.parse("Druhy Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy Solunskym 1:1'")
		expect(p.parse("Druhy Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy Solunským 1:1'")
		expect(p.parse("Druhy Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy Soluňskym 1:1'")
		expect(p.parse("Druhy Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy Soluňským 1:1'")
		expect(p.parse("Druhá Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá Solunskym 1:1'")
		expect(p.parse("Druhá Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá Solunským 1:1'")
		expect(p.parse("Druhá Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá Soluňskym 1:1'")
		expect(p.parse("Druhá Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá Soluňským 1:1'")
		expect(p.parse("Druhý Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý Solunskym 1:1'")
		expect(p.parse("Druhý Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý Solunským 1:1'")
		expect(p.parse("Druhý Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý Soluňskym 1:1'")
		expect(p.parse("Druhý Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý Soluňským 1:1'")
		expect(p.parse("II Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Tesalonickym 1:1'")
		expect(p.parse("II Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Tesalonickým 1:1'")
		expect(p.parse("2 Tesalonickym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Tesalonickym 1:1'")
		expect(p.parse("2 Tesalonickým 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Tesalonickým 1:1'")
		expect(p.parse("II. Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Solunskym 1:1'")
		expect(p.parse("II. Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Solunským 1:1'")
		expect(p.parse("II. Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Soluňskym 1:1'")
		expect(p.parse("II. Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Soluňským 1:1'")
		expect(p.parse("2. Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Solunskym 1:1'")
		expect(p.parse("2. Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Solunským 1:1'")
		expect(p.parse("2. Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Soluňskym 1:1'")
		expect(p.parse("2. Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Soluňským 1:1'")
		expect(p.parse("II Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Solunskym 1:1'")
		expect(p.parse("II Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Solunským 1:1'")
		expect(p.parse("II Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Soluňskym 1:1'")
		expect(p.parse("II Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Soluňským 1:1'")
		expect(p.parse("2 Solunskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Solunskym 1:1'")
		expect(p.parse("2 Solunským 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Solunským 1:1'")
		expect(p.parse("2 Soluňskym 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Soluňskym 1:1'")
		expect(p.parse("2 Soluňským 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Soluňským 1:1'")
		expect(p.parse("Druha Sol 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha Sol 1:1'")
		expect(p.parse("Druhy Sol 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy Sol 1:1'")
		expect(p.parse("Druhá Sol 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá Sol 1:1'")
		expect(p.parse("Druhý Sol 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý Sol 1:1'")
		expect(p.parse("Druha Te 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druha Te 1:1'")
		expect(p.parse("Druhy Te 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhy Te 1:1'")
		expect(p.parse("Druhá Te 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhá Te 1:1'")
		expect(p.parse("Druhý Te 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Druhý Te 1:1'")
		expect(p.parse("II. Sol 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Sol 1:1'")
		expect(p.parse("2. Sol 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Sol 1:1'")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2Thess 1:1'")
		expect(p.parse("II Sol 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Sol 1:1'")
		expect(p.parse("II. Te 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Te 1:1'")
		expect(p.parse("2 Sol 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Sol 1:1'")
		expect(p.parse("2. Te 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Te 1:1'")
		expect(p.parse("II Te 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Te 1:1'")
		expect(p.parse("2 Te 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Te 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("DRUHA LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA LIST TESALONICKYM 1:1'")
		expect(p.parse("DRUHA LIST TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA LIST TESALONICKÝM 1:1'")
		expect(p.parse("DRUHY LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY LIST TESALONICKYM 1:1'")
		expect(p.parse("DRUHY LIST TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY LIST TESALONICKÝM 1:1'")
		expect(p.parse("DRUHÁ LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ LIST TESALONICKYM 1:1'")
		expect(p.parse("DRUHÁ LIST TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ LIST TESALONICKÝM 1:1'")
		expect(p.parse("DRUHÝ LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ LIST TESALONICKYM 1:1'")
		expect(p.parse("DRUHÝ LIST TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ LIST TESALONICKÝM 1:1'")
		expect(p.parse("DRUHA TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA TESSALONICENSKYM 1:1'")
		expect(p.parse("DRUHA TESSALONICENSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA TESSALONICENSKÝM 1:1'")
		expect(p.parse("DRUHY TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY TESSALONICENSKYM 1:1'")
		expect(p.parse("DRUHY TESSALONICENSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY TESSALONICENSKÝM 1:1'")
		expect(p.parse("DRUHÁ TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ TESSALONICENSKYM 1:1'")
		expect(p.parse("DRUHÁ TESSALONICENSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ TESSALONICENSKÝM 1:1'")
		expect(p.parse("DRUHÝ TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ TESSALONICENSKYM 1:1'")
		expect(p.parse("DRUHÝ TESSALONICENSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ TESSALONICENSKÝM 1:1'")
		expect(p.parse("II. LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. LIST TESALONICKYM 1:1'")
		expect(p.parse("II. LIST TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. LIST TESALONICKÝM 1:1'")
		expect(p.parse("2. LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. LIST TESALONICKYM 1:1'")
		expect(p.parse("2. LIST TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. LIST TESALONICKÝM 1:1'")
		expect(p.parse("DRUHA LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA LIST SOLUNSKYM 1:1'")
		expect(p.parse("DRUHA LIST SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA LIST SOLUNSKÝM 1:1'")
		expect(p.parse("DRUHA LIST SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA LIST SOLUŇSKYM 1:1'")
		expect(p.parse("DRUHA LIST SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("DRUHY LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY LIST SOLUNSKYM 1:1'")
		expect(p.parse("DRUHY LIST SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY LIST SOLUNSKÝM 1:1'")
		expect(p.parse("DRUHY LIST SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY LIST SOLUŇSKYM 1:1'")
		expect(p.parse("DRUHY LIST SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("DRUHÁ LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ LIST SOLUNSKYM 1:1'")
		expect(p.parse("DRUHÁ LIST SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ LIST SOLUNSKÝM 1:1'")
		expect(p.parse("DRUHÁ LIST SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ LIST SOLUŇSKYM 1:1'")
		expect(p.parse("DRUHÁ LIST SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("DRUHÝ LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ LIST SOLUNSKYM 1:1'")
		expect(p.parse("DRUHÝ LIST SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ LIST SOLUNSKÝM 1:1'")
		expect(p.parse("DRUHÝ LIST SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ LIST SOLUŇSKYM 1:1'")
		expect(p.parse("DRUHÝ LIST SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("II LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II LIST TESALONICKYM 1:1'")
		expect(p.parse("II LIST TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II LIST TESALONICKÝM 1:1'")
		expect(p.parse("II. TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. TESSALONICENSKYM 1:1'")
		expect(p.parse("II. TESSALONICENSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. TESSALONICENSKÝM 1:1'")
		expect(p.parse("2 LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 LIST TESALONICKYM 1:1'")
		expect(p.parse("2 LIST TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 LIST TESALONICKÝM 1:1'")
		expect(p.parse("2. TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. TESSALONICENSKYM 1:1'")
		expect(p.parse("2. TESSALONICENSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. TESSALONICENSKÝM 1:1'")
		expect(p.parse("II TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II TESSALONICENSKYM 1:1'")
		expect(p.parse("II TESSALONICENSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II TESSALONICENSKÝM 1:1'")
		expect(p.parse("2 TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 TESSALONICENSKYM 1:1'")
		expect(p.parse("2 TESSALONICENSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 TESSALONICENSKÝM 1:1'")
		expect(p.parse("DRUHA TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA TESALONICKYM 1:1'")
		expect(p.parse("DRUHA TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA TESALONICKÝM 1:1'")
		expect(p.parse("DRUHY TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY TESALONICKYM 1:1'")
		expect(p.parse("DRUHY TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY TESALONICKÝM 1:1'")
		expect(p.parse("DRUHÁ TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ TESALONICKYM 1:1'")
		expect(p.parse("DRUHÁ TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ TESALONICKÝM 1:1'")
		expect(p.parse("DRUHÝ TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ TESALONICKYM 1:1'")
		expect(p.parse("DRUHÝ TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ TESALONICKÝM 1:1'")
		expect(p.parse("II. LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. LIST SOLUNSKYM 1:1'")
		expect(p.parse("II. LIST SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. LIST SOLUNSKÝM 1:1'")
		expect(p.parse("II. LIST SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. LIST SOLUŇSKYM 1:1'")
		expect(p.parse("II. LIST SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("2. LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. LIST SOLUNSKYM 1:1'")
		expect(p.parse("2. LIST SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. LIST SOLUNSKÝM 1:1'")
		expect(p.parse("2. LIST SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. LIST SOLUŇSKYM 1:1'")
		expect(p.parse("2. LIST SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("II LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II LIST SOLUNSKYM 1:1'")
		expect(p.parse("II LIST SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II LIST SOLUNSKÝM 1:1'")
		expect(p.parse("II LIST SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II LIST SOLUŇSKYM 1:1'")
		expect(p.parse("II LIST SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("2 LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 LIST SOLUNSKYM 1:1'")
		expect(p.parse("2 LIST SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 LIST SOLUNSKÝM 1:1'")
		expect(p.parse("2 LIST SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 LIST SOLUŇSKYM 1:1'")
		expect(p.parse("2 LIST SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("II. TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. TESALONICKYM 1:1'")
		expect(p.parse("II. TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. TESALONICKÝM 1:1'")
		expect(p.parse("2. TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. TESALONICKYM 1:1'")
		expect(p.parse("2. TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. TESALONICKÝM 1:1'")
		expect(p.parse("DRUHA SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA SOLUNSKYM 1:1'")
		expect(p.parse("DRUHA SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA SOLUNSKÝM 1:1'")
		expect(p.parse("DRUHA SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA SOLUŇSKYM 1:1'")
		expect(p.parse("DRUHA SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA SOLUŇSKÝM 1:1'")
		expect(p.parse("DRUHY SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY SOLUNSKYM 1:1'")
		expect(p.parse("DRUHY SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY SOLUNSKÝM 1:1'")
		expect(p.parse("DRUHY SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY SOLUŇSKYM 1:1'")
		expect(p.parse("DRUHY SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY SOLUŇSKÝM 1:1'")
		expect(p.parse("DRUHÁ SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ SOLUNSKYM 1:1'")
		expect(p.parse("DRUHÁ SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ SOLUNSKÝM 1:1'")
		expect(p.parse("DRUHÁ SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ SOLUŇSKYM 1:1'")
		expect(p.parse("DRUHÁ SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ SOLUŇSKÝM 1:1'")
		expect(p.parse("DRUHÝ SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ SOLUNSKYM 1:1'")
		expect(p.parse("DRUHÝ SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ SOLUNSKÝM 1:1'")
		expect(p.parse("DRUHÝ SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ SOLUŇSKYM 1:1'")
		expect(p.parse("DRUHÝ SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ SOLUŇSKÝM 1:1'")
		expect(p.parse("II TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II TESALONICKYM 1:1'")
		expect(p.parse("II TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II TESALONICKÝM 1:1'")
		expect(p.parse("2 TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 TESALONICKYM 1:1'")
		expect(p.parse("2 TESALONICKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 TESALONICKÝM 1:1'")
		expect(p.parse("II. SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. SOLUNSKYM 1:1'")
		expect(p.parse("II. SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. SOLUNSKÝM 1:1'")
		expect(p.parse("II. SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. SOLUŇSKYM 1:1'")
		expect(p.parse("II. SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. SOLUŇSKÝM 1:1'")
		expect(p.parse("2. SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. SOLUNSKYM 1:1'")
		expect(p.parse("2. SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. SOLUNSKÝM 1:1'")
		expect(p.parse("2. SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. SOLUŇSKYM 1:1'")
		expect(p.parse("2. SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. SOLUŇSKÝM 1:1'")
		expect(p.parse("II SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II SOLUNSKYM 1:1'")
		expect(p.parse("II SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II SOLUNSKÝM 1:1'")
		expect(p.parse("II SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II SOLUŇSKYM 1:1'")
		expect(p.parse("II SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II SOLUŇSKÝM 1:1'")
		expect(p.parse("2 SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 SOLUNSKYM 1:1'")
		expect(p.parse("2 SOLUNSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 SOLUNSKÝM 1:1'")
		expect(p.parse("2 SOLUŇSKYM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 SOLUŇSKYM 1:1'")
		expect(p.parse("2 SOLUŇSKÝM 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 SOLUŇSKÝM 1:1'")
		expect(p.parse("DRUHA SOL 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA SOL 1:1'")
		expect(p.parse("DRUHY SOL 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY SOL 1:1'")
		expect(p.parse("DRUHÁ SOL 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ SOL 1:1'")
		expect(p.parse("DRUHÝ SOL 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ SOL 1:1'")
		expect(p.parse("DRUHA TE 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHA TE 1:1'")
		expect(p.parse("DRUHY TE 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHY TE 1:1'")
		expect(p.parse("DRUHÁ TE 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÁ TE 1:1'")
		expect(p.parse("DRUHÝ TE 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'DRUHÝ TE 1:1'")
		expect(p.parse("II. SOL 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. SOL 1:1'")
		expect(p.parse("2. SOL 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. SOL 1:1'")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2THESS 1:1'")
		expect(p.parse("II SOL 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II SOL 1:1'")
		expect(p.parse("II. TE 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. TE 1:1'")
		expect(p.parse("2 SOL 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 SOL 1:1'")
		expect(p.parse("2. TE 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. TE 1:1'")
		expect(p.parse("II TE 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II TE 1:1'")
		expect(p.parse("2 TE 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 TE 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Thess (cs)", function() {
      
		expect(p.parse("Prvni list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni list Tesalonickym 1:1'")
		expect(p.parse("Prvni list Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni list Tesalonickým 1:1'")
		expect(p.parse("První list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První list Tesalonickym 1:1'")
		expect(p.parse("První list Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První list Tesalonickým 1:1'")
		expect(p.parse("Prvni Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni Tessalonicenskym 1:1'")
		expect(p.parse("Prvni Tessalonicenským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni Tessalonicenským 1:1'")
		expect(p.parse("První Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První Tessalonicenskym 1:1'")
		expect(p.parse("První Tessalonicenským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První Tessalonicenským 1:1'")
		expect(p.parse("1. list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. list Tesalonickym 1:1'")
		expect(p.parse("1. list Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. list Tesalonickým 1:1'")
		expect(p.parse("I. list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. list Tesalonickym 1:1'")
		expect(p.parse("I. list Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. list Tesalonickým 1:1'")
		expect(p.parse("Prvni list Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni list Solunskym 1:1'")
		expect(p.parse("Prvni list Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni list Solunským 1:1'")
		expect(p.parse("Prvni list Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni list Soluňskym 1:1'")
		expect(p.parse("Prvni list Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni list Soluňským 1:1'")
		expect(p.parse("První list Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První list Solunskym 1:1'")
		expect(p.parse("První list Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První list Solunským 1:1'")
		expect(p.parse("První list Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První list Soluňskym 1:1'")
		expect(p.parse("První list Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První list Soluňským 1:1'")
		expect(p.parse("1 list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 list Tesalonickym 1:1'")
		expect(p.parse("1 list Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 list Tesalonickým 1:1'")
		expect(p.parse("1. Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Tessalonicenskym 1:1'")
		expect(p.parse("1. Tessalonicenským 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Tessalonicenským 1:1'")
		expect(p.parse("I list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I list Tesalonickym 1:1'")
		expect(p.parse("I list Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I list Tesalonickým 1:1'")
		expect(p.parse("I. Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Tessalonicenskym 1:1'")
		expect(p.parse("I. Tessalonicenským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Tessalonicenským 1:1'")
		expect(p.parse("1 Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Tessalonicenskym 1:1'")
		expect(p.parse("1 Tessalonicenským 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Tessalonicenským 1:1'")
		expect(p.parse("I Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Tessalonicenskym 1:1'")
		expect(p.parse("I Tessalonicenským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Tessalonicenským 1:1'")
		expect(p.parse("Prvni Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni Tesalonickym 1:1'")
		expect(p.parse("Prvni Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni Tesalonickým 1:1'")
		expect(p.parse("První Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První Tesalonickym 1:1'")
		expect(p.parse("První Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První Tesalonickým 1:1'")
		expect(p.parse("1. list Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. list Solunskym 1:1'")
		expect(p.parse("1. list Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. list Solunským 1:1'")
		expect(p.parse("1. list Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. list Soluňskym 1:1'")
		expect(p.parse("1. list Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. list Soluňským 1:1'")
		expect(p.parse("I. list Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. list Solunskym 1:1'")
		expect(p.parse("I. list Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. list Solunským 1:1'")
		expect(p.parse("I. list Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. list Soluňskym 1:1'")
		expect(p.parse("I. list Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. list Soluňským 1:1'")
		expect(p.parse("1 list Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 list Solunskym 1:1'")
		expect(p.parse("1 list Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 list Solunským 1:1'")
		expect(p.parse("1 list Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 list Soluňskym 1:1'")
		expect(p.parse("1 list Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 list Soluňským 1:1'")
		expect(p.parse("I list Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I list Solunskym 1:1'")
		expect(p.parse("I list Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I list Solunským 1:1'")
		expect(p.parse("I list Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I list Soluňskym 1:1'")
		expect(p.parse("I list Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I list Soluňským 1:1'")
		expect(p.parse("1. Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Tesalonickym 1:1'")
		expect(p.parse("1. Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Tesalonickým 1:1'")
		expect(p.parse("I. Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Tesalonickym 1:1'")
		expect(p.parse("I. Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Tesalonickým 1:1'")
		expect(p.parse("Prvni Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni Solunskym 1:1'")
		expect(p.parse("Prvni Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni Solunským 1:1'")
		expect(p.parse("Prvni Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni Soluňskym 1:1'")
		expect(p.parse("Prvni Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni Soluňským 1:1'")
		expect(p.parse("První Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První Solunskym 1:1'")
		expect(p.parse("První Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První Solunským 1:1'")
		expect(p.parse("První Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První Soluňskym 1:1'")
		expect(p.parse("První Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První Soluňským 1:1'")
		expect(p.parse("1 Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Tesalonickym 1:1'")
		expect(p.parse("1 Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Tesalonickým 1:1'")
		expect(p.parse("I Tesalonickym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Tesalonickym 1:1'")
		expect(p.parse("I Tesalonickým 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Tesalonickým 1:1'")
		expect(p.parse("1. Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Solunskym 1:1'")
		expect(p.parse("1. Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Solunským 1:1'")
		expect(p.parse("1. Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Soluňskym 1:1'")
		expect(p.parse("1. Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Soluňským 1:1'")
		expect(p.parse("I. Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Solunskym 1:1'")
		expect(p.parse("I. Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Solunským 1:1'")
		expect(p.parse("I. Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Soluňskym 1:1'")
		expect(p.parse("I. Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Soluňským 1:1'")
		expect(p.parse("1 Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Solunskym 1:1'")
		expect(p.parse("1 Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Solunským 1:1'")
		expect(p.parse("1 Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Soluňskym 1:1'")
		expect(p.parse("1 Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Soluňským 1:1'")
		expect(p.parse("I Solunskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Solunskym 1:1'")
		expect(p.parse("I Solunským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Solunským 1:1'")
		expect(p.parse("I Soluňskym 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Soluňskym 1:1'")
		expect(p.parse("I Soluňským 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Soluňským 1:1'")
		expect(p.parse("Prvni Sol 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni Sol 1:1'")
		expect(p.parse("První Sol 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První Sol 1:1'")
		expect(p.parse("Prvni Te 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Prvni Te 1:1'")
		expect(p.parse("První Te 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'První Te 1:1'")
		expect(p.parse("1. Sol 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Sol 1:1'")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1Thess 1:1'")
		expect(p.parse("I. Sol 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Sol 1:1'")
		expect(p.parse("1 Sol 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Sol 1:1'")
		expect(p.parse("1. Te 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Te 1:1'")
		expect(p.parse("I Sol 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Sol 1:1'")
		expect(p.parse("I. Te 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Te 1:1'")
		expect(p.parse("1 Te 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Te 1:1'")
		expect(p.parse("I Te 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Te 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PRVNI LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI LIST TESALONICKYM 1:1'")
		expect(p.parse("PRVNI LIST TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI LIST TESALONICKÝM 1:1'")
		expect(p.parse("PRVNÍ LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ LIST TESALONICKYM 1:1'")
		expect(p.parse("PRVNÍ LIST TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ LIST TESALONICKÝM 1:1'")
		expect(p.parse("PRVNI TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI TESSALONICENSKYM 1:1'")
		expect(p.parse("PRVNI TESSALONICENSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI TESSALONICENSKÝM 1:1'")
		expect(p.parse("PRVNÍ TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ TESSALONICENSKYM 1:1'")
		expect(p.parse("PRVNÍ TESSALONICENSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ TESSALONICENSKÝM 1:1'")
		expect(p.parse("1. LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. LIST TESALONICKYM 1:1'")
		expect(p.parse("1. LIST TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. LIST TESALONICKÝM 1:1'")
		expect(p.parse("I. LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. LIST TESALONICKYM 1:1'")
		expect(p.parse("I. LIST TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. LIST TESALONICKÝM 1:1'")
		expect(p.parse("PRVNI LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI LIST SOLUNSKYM 1:1'")
		expect(p.parse("PRVNI LIST SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI LIST SOLUNSKÝM 1:1'")
		expect(p.parse("PRVNI LIST SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI LIST SOLUŇSKYM 1:1'")
		expect(p.parse("PRVNI LIST SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("PRVNÍ LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ LIST SOLUNSKYM 1:1'")
		expect(p.parse("PRVNÍ LIST SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ LIST SOLUNSKÝM 1:1'")
		expect(p.parse("PRVNÍ LIST SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ LIST SOLUŇSKYM 1:1'")
		expect(p.parse("PRVNÍ LIST SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("1 LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 LIST TESALONICKYM 1:1'")
		expect(p.parse("1 LIST TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 LIST TESALONICKÝM 1:1'")
		expect(p.parse("1. TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. TESSALONICENSKYM 1:1'")
		expect(p.parse("1. TESSALONICENSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. TESSALONICENSKÝM 1:1'")
		expect(p.parse("I LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I LIST TESALONICKYM 1:1'")
		expect(p.parse("I LIST TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I LIST TESALONICKÝM 1:1'")
		expect(p.parse("I. TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. TESSALONICENSKYM 1:1'")
		expect(p.parse("I. TESSALONICENSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. TESSALONICENSKÝM 1:1'")
		expect(p.parse("1 TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 TESSALONICENSKYM 1:1'")
		expect(p.parse("1 TESSALONICENSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 TESSALONICENSKÝM 1:1'")
		expect(p.parse("I TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I TESSALONICENSKYM 1:1'")
		expect(p.parse("I TESSALONICENSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I TESSALONICENSKÝM 1:1'")
		expect(p.parse("PRVNI TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI TESALONICKYM 1:1'")
		expect(p.parse("PRVNI TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI TESALONICKÝM 1:1'")
		expect(p.parse("PRVNÍ TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ TESALONICKYM 1:1'")
		expect(p.parse("PRVNÍ TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ TESALONICKÝM 1:1'")
		expect(p.parse("1. LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. LIST SOLUNSKYM 1:1'")
		expect(p.parse("1. LIST SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. LIST SOLUNSKÝM 1:1'")
		expect(p.parse("1. LIST SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. LIST SOLUŇSKYM 1:1'")
		expect(p.parse("1. LIST SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("I. LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. LIST SOLUNSKYM 1:1'")
		expect(p.parse("I. LIST SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. LIST SOLUNSKÝM 1:1'")
		expect(p.parse("I. LIST SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. LIST SOLUŇSKYM 1:1'")
		expect(p.parse("I. LIST SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("1 LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 LIST SOLUNSKYM 1:1'")
		expect(p.parse("1 LIST SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 LIST SOLUNSKÝM 1:1'")
		expect(p.parse("1 LIST SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 LIST SOLUŇSKYM 1:1'")
		expect(p.parse("1 LIST SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("I LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I LIST SOLUNSKYM 1:1'")
		expect(p.parse("I LIST SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I LIST SOLUNSKÝM 1:1'")
		expect(p.parse("I LIST SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I LIST SOLUŇSKYM 1:1'")
		expect(p.parse("I LIST SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I LIST SOLUŇSKÝM 1:1'")
		expect(p.parse("1. TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. TESALONICKYM 1:1'")
		expect(p.parse("1. TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. TESALONICKÝM 1:1'")
		expect(p.parse("I. TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. TESALONICKYM 1:1'")
		expect(p.parse("I. TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. TESALONICKÝM 1:1'")
		expect(p.parse("PRVNI SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI SOLUNSKYM 1:1'")
		expect(p.parse("PRVNI SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI SOLUNSKÝM 1:1'")
		expect(p.parse("PRVNI SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI SOLUŇSKYM 1:1'")
		expect(p.parse("PRVNI SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI SOLUŇSKÝM 1:1'")
		expect(p.parse("PRVNÍ SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ SOLUNSKYM 1:1'")
		expect(p.parse("PRVNÍ SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ SOLUNSKÝM 1:1'")
		expect(p.parse("PRVNÍ SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ SOLUŇSKYM 1:1'")
		expect(p.parse("PRVNÍ SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ SOLUŇSKÝM 1:1'")
		expect(p.parse("1 TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 TESALONICKYM 1:1'")
		expect(p.parse("1 TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 TESALONICKÝM 1:1'")
		expect(p.parse("I TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I TESALONICKYM 1:1'")
		expect(p.parse("I TESALONICKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I TESALONICKÝM 1:1'")
		expect(p.parse("1. SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. SOLUNSKYM 1:1'")
		expect(p.parse("1. SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. SOLUNSKÝM 1:1'")
		expect(p.parse("1. SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. SOLUŇSKYM 1:1'")
		expect(p.parse("1. SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. SOLUŇSKÝM 1:1'")
		expect(p.parse("I. SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. SOLUNSKYM 1:1'")
		expect(p.parse("I. SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. SOLUNSKÝM 1:1'")
		expect(p.parse("I. SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. SOLUŇSKYM 1:1'")
		expect(p.parse("I. SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. SOLUŇSKÝM 1:1'")
		expect(p.parse("1 SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 SOLUNSKYM 1:1'")
		expect(p.parse("1 SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 SOLUNSKÝM 1:1'")
		expect(p.parse("1 SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 SOLUŇSKYM 1:1'")
		expect(p.parse("1 SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 SOLUŇSKÝM 1:1'")
		expect(p.parse("I SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I SOLUNSKYM 1:1'")
		expect(p.parse("I SOLUNSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I SOLUNSKÝM 1:1'")
		expect(p.parse("I SOLUŇSKYM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I SOLUŇSKYM 1:1'")
		expect(p.parse("I SOLUŇSKÝM 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I SOLUŇSKÝM 1:1'")
		expect(p.parse("PRVNI SOL 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI SOL 1:1'")
		expect(p.parse("PRVNÍ SOL 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ SOL 1:1'")
		expect(p.parse("PRVNI TE 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNI TE 1:1'")
		expect(p.parse("PRVNÍ TE 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'PRVNÍ TE 1:1'")
		expect(p.parse("1. SOL 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. SOL 1:1'")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1THESS 1:1'")
		expect(p.parse("I. SOL 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. SOL 1:1'")
		expect(p.parse("1 SOL 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 SOL 1:1'")
		expect(p.parse("1. TE 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. TE 1:1'")
		expect(p.parse("I SOL 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I SOL 1:1'")
		expect(p.parse("I. TE 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. TE 1:1'")
		expect(p.parse("1 TE 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 TE 1:1'")
		expect(p.parse("I TE 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I TE 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Tim (cs)", function() {
      
		expect(p.parse("Druha list Timetejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druha list Timetejovi 1:1'")
		expect(p.parse("Druha list Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druha list Timotejovi 1:1'")
		expect(p.parse("Druhy list Timetejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhy list Timetejovi 1:1'")
		expect(p.parse("Druhy list Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhy list Timotejovi 1:1'")
		expect(p.parse("Druhá list Timetejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhá list Timetejovi 1:1'")
		expect(p.parse("Druhá list Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhá list Timotejovi 1:1'")
		expect(p.parse("Druhý list Timetejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhý list Timetejovi 1:1'")
		expect(p.parse("Druhý list Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhý list Timotejovi 1:1'")
		expect(p.parse("Druha list Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druha list Timoteovi 1:1'")
		expect(p.parse("Druhy list Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhy list Timoteovi 1:1'")
		expect(p.parse("Druhá list Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhá list Timoteovi 1:1'")
		expect(p.parse("Druhý list Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhý list Timoteovi 1:1'")
		expect(p.parse("II. list Timetejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. list Timetejovi 1:1'")
		expect(p.parse("II. list Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. list Timotejovi 1:1'")
		expect(p.parse("2. list Timetejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. list Timetejovi 1:1'")
		expect(p.parse("2. list Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. list Timotejovi 1:1'")
		expect(p.parse("II list Timetejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II list Timetejovi 1:1'")
		expect(p.parse("II list Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II list Timotejovi 1:1'")
		expect(p.parse("II. list Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. list Timoteovi 1:1'")
		expect(p.parse("2 list Timetejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 list Timetejovi 1:1'")
		expect(p.parse("2 list Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 list Timotejovi 1:1'")
		expect(p.parse("2. list Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. list Timoteovi 1:1'")
		expect(p.parse("II list Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II list Timoteovi 1:1'")
		expect(p.parse("2 list Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 list Timoteovi 1:1'")
		expect(p.parse("Druha Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druha Timotejovi 1:1'")
		expect(p.parse("Druhy Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhy Timotejovi 1:1'")
		expect(p.parse("Druhá Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhá Timotejovi 1:1'")
		expect(p.parse("Druhý Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhý Timotejovi 1:1'")
		expect(p.parse("Druha Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druha Timoteovi 1:1'")
		expect(p.parse("Druhy Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhy Timoteovi 1:1'")
		expect(p.parse("Druhá Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhá Timoteovi 1:1'")
		expect(p.parse("Druhý Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhý Timoteovi 1:1'")
		expect(p.parse("Druha Timoteus 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druha Timoteus 1:1'")
		expect(p.parse("Druhy Timoteus 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhy Timoteus 1:1'")
		expect(p.parse("Druhá Timoteus 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhá Timoteus 1:1'")
		expect(p.parse("Druhý Timoteus 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhý Timoteus 1:1'")
		expect(p.parse("II. Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. Timotejovi 1:1'")
		expect(p.parse("2. Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. Timotejovi 1:1'")
		expect(p.parse("II Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II Timotejovi 1:1'")
		expect(p.parse("II. Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. Timoteovi 1:1'")
		expect(p.parse("2 Timotejovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 Timotejovi 1:1'")
		expect(p.parse("2. Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. Timoteovi 1:1'")
		expect(p.parse("II Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II Timoteovi 1:1'")
		expect(p.parse("II. Timoteus 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. Timoteus 1:1'")
		expect(p.parse("2 Timoteovi 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 Timoteovi 1:1'")
		expect(p.parse("2. Timoteus 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. Timoteus 1:1'")
		expect(p.parse("II Timoteus 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II Timoteus 1:1'")
		expect(p.parse("2 Timoteus 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 Timoteus 1:1'")
		expect(p.parse("Druha Tim 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druha Tim 1:1'")
		expect(p.parse("Druhy Tim 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhy Tim 1:1'")
		expect(p.parse("Druhá Tim 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhá Tim 1:1'")
		expect(p.parse("Druhý Tim 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhý Tim 1:1'")
		expect(p.parse("Druha Tm 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druha Tm 1:1'")
		expect(p.parse("Druhy Tm 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhy Tm 1:1'")
		expect(p.parse("Druhá Tm 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhá Tm 1:1'")
		expect(p.parse("Druhý Tm 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Druhý Tm 1:1'")
		expect(p.parse("II. Tim 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. Tim 1:1'")
		expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. Tim 1:1'")
		expect(p.parse("II Tim 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II Tim 1:1'")
		expect(p.parse("II. Tm 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. Tm 1:1'")
		expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 Tim 1:1'")
		expect(p.parse("2. Tm 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. Tm 1:1'")
		expect(p.parse("II Tm 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II Tm 1:1'")
		expect(p.parse("2 Tm 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 Tm 1:1'")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2Tim 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("DRUHA LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHA LIST TIMETEJOVI 1:1'")
		expect(p.parse("DRUHA LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHA LIST TIMOTEJOVI 1:1'")
		expect(p.parse("DRUHY LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHY LIST TIMETEJOVI 1:1'")
		expect(p.parse("DRUHY LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHY LIST TIMOTEJOVI 1:1'")
		expect(p.parse("DRUHÁ LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÁ LIST TIMETEJOVI 1:1'")
		expect(p.parse("DRUHÁ LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÁ LIST TIMOTEJOVI 1:1'")
		expect(p.parse("DRUHÝ LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÝ LIST TIMETEJOVI 1:1'")
		expect(p.parse("DRUHÝ LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÝ LIST TIMOTEJOVI 1:1'")
		expect(p.parse("DRUHA LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHA LIST TIMOTEOVI 1:1'")
		expect(p.parse("DRUHY LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHY LIST TIMOTEOVI 1:1'")
		expect(p.parse("DRUHÁ LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÁ LIST TIMOTEOVI 1:1'")
		expect(p.parse("DRUHÝ LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÝ LIST TIMOTEOVI 1:1'")
		expect(p.parse("II. LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. LIST TIMETEJOVI 1:1'")
		expect(p.parse("II. LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. LIST TIMOTEJOVI 1:1'")
		expect(p.parse("2. LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. LIST TIMETEJOVI 1:1'")
		expect(p.parse("2. LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. LIST TIMOTEJOVI 1:1'")
		expect(p.parse("II LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II LIST TIMETEJOVI 1:1'")
		expect(p.parse("II LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II LIST TIMOTEJOVI 1:1'")
		expect(p.parse("II. LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. LIST TIMOTEOVI 1:1'")
		expect(p.parse("2 LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 LIST TIMETEJOVI 1:1'")
		expect(p.parse("2 LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 LIST TIMOTEJOVI 1:1'")
		expect(p.parse("2. LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. LIST TIMOTEOVI 1:1'")
		expect(p.parse("II LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II LIST TIMOTEOVI 1:1'")
		expect(p.parse("2 LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 LIST TIMOTEOVI 1:1'")
		expect(p.parse("DRUHA TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHA TIMOTEJOVI 1:1'")
		expect(p.parse("DRUHY TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHY TIMOTEJOVI 1:1'")
		expect(p.parse("DRUHÁ TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÁ TIMOTEJOVI 1:1'")
		expect(p.parse("DRUHÝ TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÝ TIMOTEJOVI 1:1'")
		expect(p.parse("DRUHA TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHA TIMOTEOVI 1:1'")
		expect(p.parse("DRUHY TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHY TIMOTEOVI 1:1'")
		expect(p.parse("DRUHÁ TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÁ TIMOTEOVI 1:1'")
		expect(p.parse("DRUHÝ TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÝ TIMOTEOVI 1:1'")
		expect(p.parse("DRUHA TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHA TIMOTEUS 1:1'")
		expect(p.parse("DRUHY TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHY TIMOTEUS 1:1'")
		expect(p.parse("DRUHÁ TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÁ TIMOTEUS 1:1'")
		expect(p.parse("DRUHÝ TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÝ TIMOTEUS 1:1'")
		expect(p.parse("II. TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. TIMOTEJOVI 1:1'")
		expect(p.parse("2. TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. TIMOTEJOVI 1:1'")
		expect(p.parse("II TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II TIMOTEJOVI 1:1'")
		expect(p.parse("II. TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. TIMOTEOVI 1:1'")
		expect(p.parse("2 TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 TIMOTEJOVI 1:1'")
		expect(p.parse("2. TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. TIMOTEOVI 1:1'")
		expect(p.parse("II TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II TIMOTEOVI 1:1'")
		expect(p.parse("II. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. TIMOTEUS 1:1'")
		expect(p.parse("2 TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 TIMOTEOVI 1:1'")
		expect(p.parse("2. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. TIMOTEUS 1:1'")
		expect(p.parse("II TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II TIMOTEUS 1:1'")
		expect(p.parse("2 TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 TIMOTEUS 1:1'")
		expect(p.parse("DRUHA TIM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHA TIM 1:1'")
		expect(p.parse("DRUHY TIM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHY TIM 1:1'")
		expect(p.parse("DRUHÁ TIM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÁ TIM 1:1'")
		expect(p.parse("DRUHÝ TIM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÝ TIM 1:1'")
		expect(p.parse("DRUHA TM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHA TM 1:1'")
		expect(p.parse("DRUHY TM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHY TM 1:1'")
		expect(p.parse("DRUHÁ TM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÁ TM 1:1'")
		expect(p.parse("DRUHÝ TM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'DRUHÝ TM 1:1'")
		expect(p.parse("II. TIM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. TIM 1:1'")
		expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. TIM 1:1'")
		expect(p.parse("II TIM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II TIM 1:1'")
		expect(p.parse("II. TM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. TM 1:1'")
		expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 TIM 1:1'")
		expect(p.parse("2. TM 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. TM 1:1'")
		expect(p.parse("II TM 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II TM 1:1'")
		expect(p.parse("2 TM 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 TM 1:1'")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2TIM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Tim (cs)", function() {
      
		expect(p.parse("Prvni list Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Prvni list Timotejovi 1:1'")
		expect(p.parse("První list Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'První list Timotejovi 1:1'")
		expect(p.parse("Prvni list Timeteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Prvni list Timeteovi 1:1'")
		expect(p.parse("Prvni list Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Prvni list Timoteovi 1:1'")
		expect(p.parse("První list Timeteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'První list Timeteovi 1:1'")
		expect(p.parse("První list Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'První list Timoteovi 1:1'")
		expect(p.parse("1. list Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. list Timotejovi 1:1'")
		expect(p.parse("I. list Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. list Timotejovi 1:1'")
		expect(p.parse("1 list Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 list Timotejovi 1:1'")
		expect(p.parse("1. list Timeteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. list Timeteovi 1:1'")
		expect(p.parse("1. list Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. list Timoteovi 1:1'")
		expect(p.parse("I list Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I list Timotejovi 1:1'")
		expect(p.parse("I. list Timeteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. list Timeteovi 1:1'")
		expect(p.parse("I. list Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. list Timoteovi 1:1'")
		expect(p.parse("1 list Timeteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 list Timeteovi 1:1'")
		expect(p.parse("1 list Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 list Timoteovi 1:1'")
		expect(p.parse("I list Timeteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I list Timeteovi 1:1'")
		expect(p.parse("I list Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I list Timoteovi 1:1'")
		expect(p.parse("Prvni Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Prvni Timotejovi 1:1'")
		expect(p.parse("První Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'První Timotejovi 1:1'")
		expect(p.parse("Prvni Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Prvni Timoteovi 1:1'")
		expect(p.parse("První Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'První Timoteovi 1:1'")
		expect(p.parse("Prvni Timoteus 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Prvni Timoteus 1:1'")
		expect(p.parse("První Timoteus 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'První Timoteus 1:1'")
		expect(p.parse("1. Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. Timotejovi 1:1'")
		expect(p.parse("I. Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. Timotejovi 1:1'")
		expect(p.parse("1 Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 Timotejovi 1:1'")
		expect(p.parse("1. Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. Timoteovi 1:1'")
		expect(p.parse("I Timotejovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I Timotejovi 1:1'")
		expect(p.parse("I. Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. Timoteovi 1:1'")
		expect(p.parse("1 Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 Timoteovi 1:1'")
		expect(p.parse("1. Timoteus 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. Timoteus 1:1'")
		expect(p.parse("I Timoteovi 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I Timoteovi 1:1'")
		expect(p.parse("I. Timoteus 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. Timoteus 1:1'")
		expect(p.parse("1 Timoteus 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 Timoteus 1:1'")
		expect(p.parse("I Timoteus 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I Timoteus 1:1'")
		expect(p.parse("Prvni Tim 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Prvni Tim 1:1'")
		expect(p.parse("První Tim 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'První Tim 1:1'")
		expect(p.parse("Prvni Tm 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Prvni Tm 1:1'")
		expect(p.parse("První Tm 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'První Tm 1:1'")
		expect(p.parse("1. Tim 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. Tim 1:1'")
		expect(p.parse("I. Tim 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. Tim 1:1'")
		expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 Tim 1:1'")
		expect(p.parse("1. Tm 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. Tm 1:1'")
		expect(p.parse("I Tim 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I Tim 1:1'")
		expect(p.parse("I. Tm 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. Tm 1:1'")
		expect(p.parse("1 Tm 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 Tm 1:1'")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1Tim 1:1'")
		expect(p.parse("I Tm 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I Tm 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PRVNI LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNI LIST TIMOTEJOVI 1:1'")
		expect(p.parse("PRVNÍ LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNÍ LIST TIMOTEJOVI 1:1'")
		expect(p.parse("PRVNI LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNI LIST TIMETEOVI 1:1'")
		expect(p.parse("PRVNI LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNI LIST TIMOTEOVI 1:1'")
		expect(p.parse("PRVNÍ LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNÍ LIST TIMETEOVI 1:1'")
		expect(p.parse("PRVNÍ LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNÍ LIST TIMOTEOVI 1:1'")
		expect(p.parse("1. LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. LIST TIMOTEJOVI 1:1'")
		expect(p.parse("I. LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. LIST TIMOTEJOVI 1:1'")
		expect(p.parse("1 LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 LIST TIMOTEJOVI 1:1'")
		expect(p.parse("1. LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. LIST TIMETEOVI 1:1'")
		expect(p.parse("1. LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. LIST TIMOTEOVI 1:1'")
		expect(p.parse("I LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I LIST TIMOTEJOVI 1:1'")
		expect(p.parse("I. LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. LIST TIMETEOVI 1:1'")
		expect(p.parse("I. LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. LIST TIMOTEOVI 1:1'")
		expect(p.parse("1 LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 LIST TIMETEOVI 1:1'")
		expect(p.parse("1 LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 LIST TIMOTEOVI 1:1'")
		expect(p.parse("I LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I LIST TIMETEOVI 1:1'")
		expect(p.parse("I LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I LIST TIMOTEOVI 1:1'")
		expect(p.parse("PRVNI TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNI TIMOTEJOVI 1:1'")
		expect(p.parse("PRVNÍ TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNÍ TIMOTEJOVI 1:1'")
		expect(p.parse("PRVNI TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNI TIMOTEOVI 1:1'")
		expect(p.parse("PRVNÍ TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNÍ TIMOTEOVI 1:1'")
		expect(p.parse("PRVNI TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNI TIMOTEUS 1:1'")
		expect(p.parse("PRVNÍ TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNÍ TIMOTEUS 1:1'")
		expect(p.parse("1. TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. TIMOTEJOVI 1:1'")
		expect(p.parse("I. TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. TIMOTEJOVI 1:1'")
		expect(p.parse("1 TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 TIMOTEJOVI 1:1'")
		expect(p.parse("1. TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. TIMOTEOVI 1:1'")
		expect(p.parse("I TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I TIMOTEJOVI 1:1'")
		expect(p.parse("I. TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. TIMOTEOVI 1:1'")
		expect(p.parse("1 TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 TIMOTEOVI 1:1'")
		expect(p.parse("1. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. TIMOTEUS 1:1'")
		expect(p.parse("I TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I TIMOTEOVI 1:1'")
		expect(p.parse("I. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. TIMOTEUS 1:1'")
		expect(p.parse("1 TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 TIMOTEUS 1:1'")
		expect(p.parse("I TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I TIMOTEUS 1:1'")
		expect(p.parse("PRVNI TIM 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNI TIM 1:1'")
		expect(p.parse("PRVNÍ TIM 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNÍ TIM 1:1'")
		expect(p.parse("PRVNI TM 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNI TM 1:1'")
		expect(p.parse("PRVNÍ TM 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'PRVNÍ TM 1:1'")
		expect(p.parse("1. TIM 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. TIM 1:1'")
		expect(p.parse("I. TIM 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. TIM 1:1'")
		expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 TIM 1:1'")
		expect(p.parse("1. TM 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. TM 1:1'")
		expect(p.parse("I TIM 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I TIM 1:1'")
		expect(p.parse("I. TM 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. TM 1:1'")
		expect(p.parse("1 TM 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 TM 1:1'")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1TIM 1:1'")
		expect(p.parse("I TM 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I TM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Titus (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Titus (cs)", function() {
      
		expect(p.parse("List Titovi 1:1").osis()).toEqual("Titus.1.1", "parsing: 'List Titovi 1:1'")
		expect(p.parse("Titovi 1:1").osis()).toEqual("Titus.1.1", "parsing: 'Titovi 1:1'")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1", "parsing: 'Titus 1:1'")
		expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1", "parsing: 'Tit 1:1'")
		expect(p.parse("Tt 1:1").osis()).toEqual("Titus.1.1", "parsing: 'Tt 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("LIST TITOVI 1:1").osis()).toEqual("Titus.1.1", "parsing: 'LIST TITOVI 1:1'")
		expect(p.parse("TITOVI 1:1").osis()).toEqual("Titus.1.1", "parsing: 'TITOVI 1:1'")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1", "parsing: 'TITUS 1:1'")
		expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1", "parsing: 'TIT 1:1'")
		expect(p.parse("TT 1:1").osis()).toEqual("Titus.1.1", "parsing: 'TT 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Phlm (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phlm (cs)", function() {
      
		expect(p.parse("List Filemonovi 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'List Filemonovi 1:1'")
		expect(p.parse("Filemonovi 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Filemonovi 1:1'")
		expect(p.parse("Filemon 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Filemon 1:1'")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Phlm 1:1'")
		expect(p.parse("Flm 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Flm 1:1'")
		expect(p.parse("Fm 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Fm 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("LIST FILEMONOVI 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'LIST FILEMONOVI 1:1'")
		expect(p.parse("FILEMONOVI 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'FILEMONOVI 1:1'")
		expect(p.parse("FILEMON 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'FILEMON 1:1'")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'PHLM 1:1'")
		expect(p.parse("FLM 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'FLM 1:1'")
		expect(p.parse("FM 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'FM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Heb (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Heb (cs)", function() {
      
		expect(p.parse("List Hebrejum 1:1").osis()).toEqual("Heb.1.1", "parsing: 'List Hebrejum 1:1'")
		expect(p.parse("List Hebrejům 1:1").osis()).toEqual("Heb.1.1", "parsing: 'List Hebrejům 1:1'")
		expect(p.parse("List Zidum 1:1").osis()).toEqual("Heb.1.1", "parsing: 'List Zidum 1:1'")
		expect(p.parse("List Zidům 1:1").osis()).toEqual("Heb.1.1", "parsing: 'List Zidům 1:1'")
		expect(p.parse("List Židum 1:1").osis()).toEqual("Heb.1.1", "parsing: 'List Židum 1:1'")
		expect(p.parse("List Židům 1:1").osis()).toEqual("Heb.1.1", "parsing: 'List Židům 1:1'")
		expect(p.parse("Hebrejum 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Hebrejum 1:1'")
		expect(p.parse("Hebrejům 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Hebrejům 1:1'")
		expect(p.parse("Zidum 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Zidum 1:1'")
		expect(p.parse("Zidům 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Zidům 1:1'")
		expect(p.parse("Židum 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Židum 1:1'")
		expect(p.parse("Židům 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Židům 1:1'")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Heb 1:1'")
		expect(p.parse("Zid 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Zid 1:1'")
		expect(p.parse("Žid 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Žid 1:1'")
		expect(p.parse("Zd 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Zd 1:1'")
		expect(p.parse("Žd 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Žd 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("LIST HEBREJUM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'LIST HEBREJUM 1:1'")
		expect(p.parse("LIST HEBREJŮM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'LIST HEBREJŮM 1:1'")
		expect(p.parse("LIST ZIDUM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'LIST ZIDUM 1:1'")
		expect(p.parse("LIST ZIDŮM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'LIST ZIDŮM 1:1'")
		expect(p.parse("LIST ŽIDUM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'LIST ŽIDUM 1:1'")
		expect(p.parse("LIST ŽIDŮM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'LIST ŽIDŮM 1:1'")
		expect(p.parse("HEBREJUM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'HEBREJUM 1:1'")
		expect(p.parse("HEBREJŮM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'HEBREJŮM 1:1'")
		expect(p.parse("ZIDUM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ZIDUM 1:1'")
		expect(p.parse("ZIDŮM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ZIDŮM 1:1'")
		expect(p.parse("ŽIDUM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ŽIDUM 1:1'")
		expect(p.parse("ŽIDŮM 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ŽIDŮM 1:1'")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1", "parsing: 'HEB 1:1'")
		expect(p.parse("ZID 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ZID 1:1'")
		expect(p.parse("ŽID 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ŽID 1:1'")
		expect(p.parse("ZD 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ZD 1:1'")
		expect(p.parse("ŽD 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ŽD 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jas (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jas (cs)", function() {
      
		expect(p.parse("List Jakubuv 1:1").osis()).toEqual("Jas.1.1", "parsing: 'List Jakubuv 1:1'")
		expect(p.parse("List Jakubův 1:1").osis()).toEqual("Jas.1.1", "parsing: 'List Jakubův 1:1'")
		expect(p.parse("Jakubuv 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Jakubuv 1:1'")
		expect(p.parse("Jakubův 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Jakubův 1:1'")
		expect(p.parse("Jakub 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Jakub 1:1'")
		expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Jak 1:1'")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Jas 1:1'")
		expect(p.parse("Jk 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Jk 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("LIST JAKUBUV 1:1").osis()).toEqual("Jas.1.1", "parsing: 'LIST JAKUBUV 1:1'")
		expect(p.parse("LIST JAKUBŮV 1:1").osis()).toEqual("Jas.1.1", "parsing: 'LIST JAKUBŮV 1:1'")
		expect(p.parse("JAKUBUV 1:1").osis()).toEqual("Jas.1.1", "parsing: 'JAKUBUV 1:1'")
		expect(p.parse("JAKUBŮV 1:1").osis()).toEqual("Jas.1.1", "parsing: 'JAKUBŮV 1:1'")
		expect(p.parse("JAKUB 1:1").osis()).toEqual("Jas.1.1", "parsing: 'JAKUB 1:1'")
		expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1", "parsing: 'JAK 1:1'")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1", "parsing: 'JAS 1:1'")
		expect(p.parse("JK 1:1").osis()).toEqual("Jas.1.1", "parsing: 'JK 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Pet (cs)", function() {
      
		expect(p.parse("Druha list Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druha list Petruv 1:1'")
		expect(p.parse("Druha list Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druha list Petrův 1:1'")
		expect(p.parse("Druhy list Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhy list Petruv 1:1'")
		expect(p.parse("Druhy list Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhy list Petrův 1:1'")
		expect(p.parse("Druhá list Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhá list Petruv 1:1'")
		expect(p.parse("Druhá list Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhá list Petrův 1:1'")
		expect(p.parse("Druhý list Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhý list Petruv 1:1'")
		expect(p.parse("Druhý list Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhý list Petrův 1:1'")
		expect(p.parse("II. list Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. list Petruv 1:1'")
		expect(p.parse("II. list Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. list Petrův 1:1'")
		expect(p.parse("2. list Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. list Petruv 1:1'")
		expect(p.parse("2. list Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. list Petrův 1:1'")
		expect(p.parse("II list Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II list Petruv 1:1'")
		expect(p.parse("II list Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II list Petrův 1:1'")
		expect(p.parse("2 list Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 list Petruv 1:1'")
		expect(p.parse("2 list Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 list Petrův 1:1'")
		expect(p.parse("Druha Petrova 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druha Petrova 1:1'")
		expect(p.parse("Druhy Petrova 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhy Petrova 1:1'")
		expect(p.parse("Druhá Petrova 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhá Petrova 1:1'")
		expect(p.parse("Druhý Petrova 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhý Petrova 1:1'")
		expect(p.parse("Druha Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druha Petruv 1:1'")
		expect(p.parse("Druha Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druha Petrův 1:1'")
		expect(p.parse("Druhy Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhy Petruv 1:1'")
		expect(p.parse("Druhy Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhy Petrův 1:1'")
		expect(p.parse("Druhá Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhá Petruv 1:1'")
		expect(p.parse("Druhá Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhá Petrův 1:1'")
		expect(p.parse("Druhý Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhý Petruv 1:1'")
		expect(p.parse("Druhý Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhý Petrův 1:1'")
		expect(p.parse("II. Petrova 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. Petrova 1:1'")
		expect(p.parse("2. Petrova 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. Petrova 1:1'")
		expect(p.parse("Druha Petr 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druha Petr 1:1'")
		expect(p.parse("Druhy Petr 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhy Petr 1:1'")
		expect(p.parse("Druhá Petr 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhá Petr 1:1'")
		expect(p.parse("Druhý Petr 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhý Petr 1:1'")
		expect(p.parse("II Petrova 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II Petrova 1:1'")
		expect(p.parse("II. Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. Petruv 1:1'")
		expect(p.parse("II. Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. Petrův 1:1'")
		expect(p.parse("2 Petrova 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 Petrova 1:1'")
		expect(p.parse("2. Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. Petruv 1:1'")
		expect(p.parse("2. Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. Petrův 1:1'")
		expect(p.parse("II Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II Petruv 1:1'")
		expect(p.parse("II Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II Petrův 1:1'")
		expect(p.parse("2 Petruv 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 Petruv 1:1'")
		expect(p.parse("2 Petrův 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 Petrův 1:1'")
		expect(p.parse("Druha Pt 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druha Pt 1:1'")
		expect(p.parse("Druhy Pt 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhy Pt 1:1'")
		expect(p.parse("Druhá Pt 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhá Pt 1:1'")
		expect(p.parse("Druhý Pt 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhý Pt 1:1'")
		expect(p.parse("II. Petr 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. Petr 1:1'")
		expect(p.parse("2. Petr 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. Petr 1:1'")
		expect(p.parse("Druha P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druha P 1:1'")
		expect(p.parse("Druhy P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhy P 1:1'")
		expect(p.parse("Druhá P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhá P 1:1'")
		expect(p.parse("Druhý P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Druhý P 1:1'")
		expect(p.parse("II Petr 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II Petr 1:1'")
		expect(p.parse("2 Petr 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 Petr 1:1'")
		expect(p.parse("II. Pt 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. Pt 1:1'")
		expect(p.parse("2. Pt 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. Pt 1:1'")
		expect(p.parse("II Pt 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II Pt 1:1'")
		expect(p.parse("II. P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. P 1:1'")
		expect(p.parse("2 Pt 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 Pt 1:1'")
		expect(p.parse("2. P 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. P 1:1'")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2Pet 1:1'")
		expect(p.parse("II P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II P 1:1'")
		expect(p.parse("2 P 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 P 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("DRUHA LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHA LIST PETRUV 1:1'")
		expect(p.parse("DRUHA LIST PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHA LIST PETRŮV 1:1'")
		expect(p.parse("DRUHY LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHY LIST PETRUV 1:1'")
		expect(p.parse("DRUHY LIST PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHY LIST PETRŮV 1:1'")
		expect(p.parse("DRUHÁ LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÁ LIST PETRUV 1:1'")
		expect(p.parse("DRUHÁ LIST PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÁ LIST PETRŮV 1:1'")
		expect(p.parse("DRUHÝ LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÝ LIST PETRUV 1:1'")
		expect(p.parse("DRUHÝ LIST PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÝ LIST PETRŮV 1:1'")
		expect(p.parse("II. LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. LIST PETRUV 1:1'")
		expect(p.parse("II. LIST PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. LIST PETRŮV 1:1'")
		expect(p.parse("2. LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. LIST PETRUV 1:1'")
		expect(p.parse("2. LIST PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. LIST PETRŮV 1:1'")
		expect(p.parse("II LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II LIST PETRUV 1:1'")
		expect(p.parse("II LIST PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II LIST PETRŮV 1:1'")
		expect(p.parse("2 LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 LIST PETRUV 1:1'")
		expect(p.parse("2 LIST PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 LIST PETRŮV 1:1'")
		expect(p.parse("DRUHA PETROVA 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHA PETROVA 1:1'")
		expect(p.parse("DRUHY PETROVA 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHY PETROVA 1:1'")
		expect(p.parse("DRUHÁ PETROVA 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÁ PETROVA 1:1'")
		expect(p.parse("DRUHÝ PETROVA 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÝ PETROVA 1:1'")
		expect(p.parse("DRUHA PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHA PETRUV 1:1'")
		expect(p.parse("DRUHA PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHA PETRŮV 1:1'")
		expect(p.parse("DRUHY PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHY PETRUV 1:1'")
		expect(p.parse("DRUHY PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHY PETRŮV 1:1'")
		expect(p.parse("DRUHÁ PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÁ PETRUV 1:1'")
		expect(p.parse("DRUHÁ PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÁ PETRŮV 1:1'")
		expect(p.parse("DRUHÝ PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÝ PETRUV 1:1'")
		expect(p.parse("DRUHÝ PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÝ PETRŮV 1:1'")
		expect(p.parse("II. PETROVA 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. PETROVA 1:1'")
		expect(p.parse("2. PETROVA 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. PETROVA 1:1'")
		expect(p.parse("DRUHA PETR 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHA PETR 1:1'")
		expect(p.parse("DRUHY PETR 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHY PETR 1:1'")
		expect(p.parse("DRUHÁ PETR 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÁ PETR 1:1'")
		expect(p.parse("DRUHÝ PETR 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÝ PETR 1:1'")
		expect(p.parse("II PETROVA 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II PETROVA 1:1'")
		expect(p.parse("II. PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. PETRUV 1:1'")
		expect(p.parse("II. PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. PETRŮV 1:1'")
		expect(p.parse("2 PETROVA 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 PETROVA 1:1'")
		expect(p.parse("2. PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. PETRUV 1:1'")
		expect(p.parse("2. PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. PETRŮV 1:1'")
		expect(p.parse("II PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II PETRUV 1:1'")
		expect(p.parse("II PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II PETRŮV 1:1'")
		expect(p.parse("2 PETRUV 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 PETRUV 1:1'")
		expect(p.parse("2 PETRŮV 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 PETRŮV 1:1'")
		expect(p.parse("DRUHA PT 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHA PT 1:1'")
		expect(p.parse("DRUHY PT 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHY PT 1:1'")
		expect(p.parse("DRUHÁ PT 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÁ PT 1:1'")
		expect(p.parse("DRUHÝ PT 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÝ PT 1:1'")
		expect(p.parse("II. PETR 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. PETR 1:1'")
		expect(p.parse("2. PETR 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. PETR 1:1'")
		expect(p.parse("DRUHA P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHA P 1:1'")
		expect(p.parse("DRUHY P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHY P 1:1'")
		expect(p.parse("DRUHÁ P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÁ P 1:1'")
		expect(p.parse("DRUHÝ P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'DRUHÝ P 1:1'")
		expect(p.parse("II PETR 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II PETR 1:1'")
		expect(p.parse("2 PETR 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 PETR 1:1'")
		expect(p.parse("II. PT 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. PT 1:1'")
		expect(p.parse("2. PT 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. PT 1:1'")
		expect(p.parse("II PT 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II PT 1:1'")
		expect(p.parse("II. P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. P 1:1'")
		expect(p.parse("2 PT 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 PT 1:1'")
		expect(p.parse("2. P 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. P 1:1'")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2PET 1:1'")
		expect(p.parse("II P 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II P 1:1'")
		expect(p.parse("2 P 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 P 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Pet (cs)", function() {
      
		expect(p.parse("Prvni list Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Prvni list Petruv 1:1'")
		expect(p.parse("Prvni list Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Prvni list Petrův 1:1'")
		expect(p.parse("První list Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'První list Petruv 1:1'")
		expect(p.parse("První list Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'První list Petrův 1:1'")
		expect(p.parse("1. list Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. list Petruv 1:1'")
		expect(p.parse("1. list Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. list Petrův 1:1'")
		expect(p.parse("I. list Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. list Petruv 1:1'")
		expect(p.parse("I. list Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. list Petrův 1:1'")
		expect(p.parse("1 list Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 list Petruv 1:1'")
		expect(p.parse("1 list Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 list Petrův 1:1'")
		expect(p.parse("I list Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I list Petruv 1:1'")
		expect(p.parse("I list Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I list Petrův 1:1'")
		expect(p.parse("Prvni Petrova 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Prvni Petrova 1:1'")
		expect(p.parse("První Petrova 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'První Petrova 1:1'")
		expect(p.parse("Prvni Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Prvni Petruv 1:1'")
		expect(p.parse("Prvni Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Prvni Petrův 1:1'")
		expect(p.parse("První Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'První Petruv 1:1'")
		expect(p.parse("První Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'První Petrův 1:1'")
		expect(p.parse("1. Petrova 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. Petrova 1:1'")
		expect(p.parse("I. Petrova 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. Petrova 1:1'")
		expect(p.parse("Prvni Petr 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Prvni Petr 1:1'")
		expect(p.parse("První Petr 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'První Petr 1:1'")
		expect(p.parse("1 Petrova 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 Petrova 1:1'")
		expect(p.parse("1. Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. Petruv 1:1'")
		expect(p.parse("1. Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. Petrův 1:1'")
		expect(p.parse("I Petrova 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I Petrova 1:1'")
		expect(p.parse("I. Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. Petruv 1:1'")
		expect(p.parse("I. Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. Petrův 1:1'")
		expect(p.parse("1 Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 Petruv 1:1'")
		expect(p.parse("1 Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 Petrův 1:1'")
		expect(p.parse("I Petruv 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I Petruv 1:1'")
		expect(p.parse("I Petrův 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I Petrův 1:1'")
		expect(p.parse("Prvni Pt 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Prvni Pt 1:1'")
		expect(p.parse("První Pt 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'První Pt 1:1'")
		expect(p.parse("1. Petr 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. Petr 1:1'")
		expect(p.parse("I. Petr 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. Petr 1:1'")
		expect(p.parse("Prvni P 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Prvni P 1:1'")
		expect(p.parse("První P 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'První P 1:1'")
		expect(p.parse("1 Petr 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 Petr 1:1'")
		expect(p.parse("I Petr 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I Petr 1:1'")
		expect(p.parse("1. Pt 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. Pt 1:1'")
		expect(p.parse("I. Pt 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. Pt 1:1'")
		expect(p.parse("1 Pt 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 Pt 1:1'")
		expect(p.parse("1. P 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. P 1:1'")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1Pet 1:1'")
		expect(p.parse("I Pt 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I Pt 1:1'")
		expect(p.parse("I. P 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. P 1:1'")
		expect(p.parse("1 P 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 P 1:1'")
		expect(p.parse("I P 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I P 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("PRVNI LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNI LIST PETRUV 1:1'")
		expect(p.parse("PRVNI LIST PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNI LIST PETRŮV 1:1'")
		expect(p.parse("PRVNÍ LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNÍ LIST PETRUV 1:1'")
		expect(p.parse("PRVNÍ LIST PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNÍ LIST PETRŮV 1:1'")
		expect(p.parse("1. LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. LIST PETRUV 1:1'")
		expect(p.parse("1. LIST PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. LIST PETRŮV 1:1'")
		expect(p.parse("I. LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. LIST PETRUV 1:1'")
		expect(p.parse("I. LIST PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. LIST PETRŮV 1:1'")
		expect(p.parse("1 LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 LIST PETRUV 1:1'")
		expect(p.parse("1 LIST PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 LIST PETRŮV 1:1'")
		expect(p.parse("I LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I LIST PETRUV 1:1'")
		expect(p.parse("I LIST PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I LIST PETRŮV 1:1'")
		expect(p.parse("PRVNI PETROVA 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNI PETROVA 1:1'")
		expect(p.parse("PRVNÍ PETROVA 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNÍ PETROVA 1:1'")
		expect(p.parse("PRVNI PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNI PETRUV 1:1'")
		expect(p.parse("PRVNI PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNI PETRŮV 1:1'")
		expect(p.parse("PRVNÍ PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNÍ PETRUV 1:1'")
		expect(p.parse("PRVNÍ PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNÍ PETRŮV 1:1'")
		expect(p.parse("1. PETROVA 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. PETROVA 1:1'")
		expect(p.parse("I. PETROVA 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. PETROVA 1:1'")
		expect(p.parse("PRVNI PETR 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNI PETR 1:1'")
		expect(p.parse("PRVNÍ PETR 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNÍ PETR 1:1'")
		expect(p.parse("1 PETROVA 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 PETROVA 1:1'")
		expect(p.parse("1. PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. PETRUV 1:1'")
		expect(p.parse("1. PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. PETRŮV 1:1'")
		expect(p.parse("I PETROVA 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I PETROVA 1:1'")
		expect(p.parse("I. PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. PETRUV 1:1'")
		expect(p.parse("I. PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. PETRŮV 1:1'")
		expect(p.parse("1 PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 PETRUV 1:1'")
		expect(p.parse("1 PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 PETRŮV 1:1'")
		expect(p.parse("I PETRUV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I PETRUV 1:1'")
		expect(p.parse("I PETRŮV 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I PETRŮV 1:1'")
		expect(p.parse("PRVNI PT 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNI PT 1:1'")
		expect(p.parse("PRVNÍ PT 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNÍ PT 1:1'")
		expect(p.parse("1. PETR 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. PETR 1:1'")
		expect(p.parse("I. PETR 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. PETR 1:1'")
		expect(p.parse("PRVNI P 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNI P 1:1'")
		expect(p.parse("PRVNÍ P 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'PRVNÍ P 1:1'")
		expect(p.parse("1 PETR 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 PETR 1:1'")
		expect(p.parse("I PETR 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I PETR 1:1'")
		expect(p.parse("1. PT 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. PT 1:1'")
		expect(p.parse("I. PT 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. PT 1:1'")
		expect(p.parse("1 PT 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 PT 1:1'")
		expect(p.parse("1. P 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. P 1:1'")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1PET 1:1'")
		expect(p.parse("I PT 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I PT 1:1'")
		expect(p.parse("I. P 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. P 1:1'")
		expect(p.parse("1 P 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 P 1:1'")
		expect(p.parse("I P 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I P 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jude (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jude (cs)", function() {
      
		expect(p.parse("List Juduv 1:1").osis()).toEqual("Jude.1.1", "parsing: 'List Juduv 1:1'")
		expect(p.parse("List Judův 1:1").osis()).toEqual("Jude.1.1", "parsing: 'List Judův 1:1'")
		expect(p.parse("Judova 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Judova 1:1'")
		expect(p.parse("Juduv 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Juduv 1:1'")
		expect(p.parse("Judův 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Judův 1:1'")
		expect(p.parse("Juda 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Juda 1:1'")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Jude 1:1'")
		expect(p.parse("Jd 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Jd 1:1'")
		expect(p.parse("Ju 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Ju 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("LIST JUDUV 1:1").osis()).toEqual("Jude.1.1", "parsing: 'LIST JUDUV 1:1'")
		expect(p.parse("LIST JUDŮV 1:1").osis()).toEqual("Jude.1.1", "parsing: 'LIST JUDŮV 1:1'")
		expect(p.parse("JUDOVA 1:1").osis()).toEqual("Jude.1.1", "parsing: 'JUDOVA 1:1'")
		expect(p.parse("JUDUV 1:1").osis()).toEqual("Jude.1.1", "parsing: 'JUDUV 1:1'")
		expect(p.parse("JUDŮV 1:1").osis()).toEqual("Jude.1.1", "parsing: 'JUDŮV 1:1'")
		expect(p.parse("JUDA 1:1").osis()).toEqual("Jude.1.1", "parsing: 'JUDA 1:1'")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1", "parsing: 'JUDE 1:1'")
		expect(p.parse("JD 1:1").osis()).toEqual("Jude.1.1", "parsing: 'JD 1:1'")
		expect(p.parse("JU 1:1").osis()).toEqual("Jude.1.1", "parsing: 'JU 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Tob (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Tob (cs)", function() {
      
		expect(p.parse("Tobijas 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tobijas 1:1'")
		expect(p.parse("Tobijaš 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tobijaš 1:1'")
		expect(p.parse("Tobijás 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tobijás 1:1'")
		expect(p.parse("Tobijáš 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tobijáš 1:1'")
		expect(p.parse("Tóbijas 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tóbijas 1:1'")
		expect(p.parse("Tóbijaš 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tóbijaš 1:1'")
		expect(p.parse("Tóbijás 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tóbijás 1:1'")
		expect(p.parse("Tóbijáš 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tóbijáš 1:1'")
		expect(p.parse("Tobias 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tobias 1:1'")
		expect(p.parse("Tobiaš 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tobiaš 1:1'")
		expect(p.parse("Tobiás 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tobiás 1:1'")
		expect(p.parse("Tobiáš 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tobiáš 1:1'")
		expect(p.parse("Tobit 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tobit 1:1'")
		expect(p.parse("Tóbit 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tóbit 1:1'")
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tob 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jdt (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jdt (cs)", function() {
      
		expect(p.parse("Judit 1:1").osis()).toEqual("Jdt.1.1", "parsing: 'Judit 1:1'")
		expect(p.parse("Júdit 1:1").osis()).toEqual("Jdt.1.1", "parsing: 'Júdit 1:1'")
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1", "parsing: 'Jdt 1:1'")
		expect(p.parse("Jud 1:1").osis()).toEqual("Jdt.1.1", "parsing: 'Jud 1:1'")
		expect(p.parse("Júd 1:1").osis()).toEqual("Jdt.1.1", "parsing: 'Júd 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Bar (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bar (cs)", function() {
      
		expect(p.parse("Kniha Baruchova 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Kniha Baruchova 1:1'")
		expect(p.parse("Kniha Báruchova 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Kniha Báruchova 1:1'")
		expect(p.parse("Kniha Barukova 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Kniha Barukova 1:1'")
		expect(p.parse("Kniha Bárukova 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Kniha Bárukova 1:1'")
		expect(p.parse("Baruch 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Baruch 1:1'")
		expect(p.parse("Báruch 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Báruch 1:1'")
		expect(p.parse("Baruk 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Baruk 1:1'")
		expect(p.parse("Báruk 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Báruk 1:1'")
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Bar 1:1'")
		expect(p.parse("Bár 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Bár 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Sus (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sus (cs)", function() {
      
		expect(p.parse("Zuzana 1:1").osis()).toEqual("Sus.1.1", "parsing: 'Zuzana 1:1'")
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1", "parsing: 'Sus 1:1'")
		expect(p.parse("Zuz 1:1").osis()).toEqual("Sus.1.1", "parsing: 'Zuz 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Macc (cs)", function() {
      
		expect(p.parse("Druha Makabejska 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druha Makabejska 1:1'")
		expect(p.parse("Druha Makabejská 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druha Makabejská 1:1'")
		expect(p.parse("Druhy Makabejska 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druhy Makabejska 1:1'")
		expect(p.parse("Druhy Makabejská 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druhy Makabejská 1:1'")
		expect(p.parse("Druhá Makabejska 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druhá Makabejska 1:1'")
		expect(p.parse("Druhá Makabejská 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druhá Makabejská 1:1'")
		expect(p.parse("Druhý Makabejska 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druhý Makabejska 1:1'")
		expect(p.parse("Druhý Makabejská 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druhý Makabejská 1:1'")
		expect(p.parse("II. Makabejska 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II. Makabejska 1:1'")
		expect(p.parse("II. Makabejská 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II. Makabejská 1:1'")
		expect(p.parse("2. Makabejska 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2. Makabejska 1:1'")
		expect(p.parse("2. Makabejská 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2. Makabejská 1:1'")
		expect(p.parse("II Makabejska 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II Makabejska 1:1'")
		expect(p.parse("II Makabejská 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II Makabejská 1:1'")
		expect(p.parse("2 Makabejska 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2 Makabejska 1:1'")
		expect(p.parse("2 Makabejská 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2 Makabejská 1:1'")
		expect(p.parse("Druha Mak 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druha Mak 1:1'")
		expect(p.parse("Druhy Mak 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druhy Mak 1:1'")
		expect(p.parse("Druhá Mak 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druhá Mak 1:1'")
		expect(p.parse("Druhý Mak 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Druhý Mak 1:1'")
		expect(p.parse("II. Mak 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II. Mak 1:1'")
		expect(p.parse("2. Mak 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2. Mak 1:1'")
		expect(p.parse("II Mak 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II Mak 1:1'")
		expect(p.parse("2 Mak 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2 Mak 1:1'")
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2Macc 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3Macc (cs)", function() {
      
		expect(p.parse("Treti Makabejska 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Treti Makabejska 1:1'")
		expect(p.parse("Treti Makabejská 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Treti Makabejská 1:1'")
		expect(p.parse("Tretí Makabejska 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Tretí Makabejska 1:1'")
		expect(p.parse("Tretí Makabejská 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Tretí Makabejská 1:1'")
		expect(p.parse("Třeti Makabejska 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Třeti Makabejska 1:1'")
		expect(p.parse("Třeti Makabejská 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Třeti Makabejská 1:1'")
		expect(p.parse("Třetí Makabejska 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Třetí Makabejska 1:1'")
		expect(p.parse("Třetí Makabejská 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Třetí Makabejská 1:1'")
		expect(p.parse("III. Makabejska 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III. Makabejska 1:1'")
		expect(p.parse("III. Makabejská 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III. Makabejská 1:1'")
		expect(p.parse("III Makabejska 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III Makabejska 1:1'")
		expect(p.parse("III Makabejská 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III Makabejská 1:1'")
		expect(p.parse("3. Makabejska 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3. Makabejska 1:1'")
		expect(p.parse("3. Makabejská 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3. Makabejská 1:1'")
		expect(p.parse("3 Makabejska 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3 Makabejska 1:1'")
		expect(p.parse("3 Makabejská 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3 Makabejská 1:1'")
		expect(p.parse("Treti Mak 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Treti Mak 1:1'")
		expect(p.parse("Tretí Mak 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Tretí Mak 1:1'")
		expect(p.parse("Třeti Mak 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Třeti Mak 1:1'")
		expect(p.parse("Třetí Mak 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Třetí Mak 1:1'")
		expect(p.parse("III. Mak 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III. Mak 1:1'")
		expect(p.parse("III Mak 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III Mak 1:1'")
		expect(p.parse("3. Mak 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3. Mak 1:1'")
		expect(p.parse("3 Mak 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3 Mak 1:1'")
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3Macc 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 4Macc (cs)", function() {
      
		expect(p.parse("Ctvrta Makabejska 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Ctvrta Makabejska 1:1'")
		expect(p.parse("Ctvrta Makabejská 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Ctvrta Makabejská 1:1'")
		expect(p.parse("Ctvrtá Makabejska 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Ctvrtá Makabejska 1:1'")
		expect(p.parse("Ctvrtá Makabejská 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Ctvrtá Makabejská 1:1'")
		expect(p.parse("Čtvrta Makabejska 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Čtvrta Makabejska 1:1'")
		expect(p.parse("Čtvrta Makabejská 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Čtvrta Makabejská 1:1'")
		expect(p.parse("Čtvrtá Makabejska 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Čtvrtá Makabejska 1:1'")
		expect(p.parse("Čtvrtá Makabejská 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Čtvrtá Makabejská 1:1'")
		expect(p.parse("IV. Makabejska 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV. Makabejska 1:1'")
		expect(p.parse("IV. Makabejská 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV. Makabejská 1:1'")
		expect(p.parse("4. Makabejska 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4. Makabejska 1:1'")
		expect(p.parse("4. Makabejská 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4. Makabejská 1:1'")
		expect(p.parse("IV Makabejska 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV Makabejska 1:1'")
		expect(p.parse("IV Makabejská 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV Makabejská 1:1'")
		expect(p.parse("4 Makabejska 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4 Makabejska 1:1'")
		expect(p.parse("4 Makabejská 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4 Makabejská 1:1'")
		expect(p.parse("Ctvrta Mak 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Ctvrta Mak 1:1'")
		expect(p.parse("Ctvrtá Mak 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Ctvrtá Mak 1:1'")
		expect(p.parse("Čtvrta Mak 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Čtvrta Mak 1:1'")
		expect(p.parse("Čtvrtá Mak 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Čtvrtá Mak 1:1'")
		expect(p.parse("IV. Mak 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV. Mak 1:1'")
		expect(p.parse("4. Mak 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4. Mak 1:1'")
		expect(p.parse("IV Mak 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV Mak 1:1'")
		expect(p.parse("4 Mak 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4 Mak 1:1'")
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4Macc 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (cs)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Macc (cs)", function() {
      
		expect(p.parse("Prvni Makabejska 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'Prvni Makabejska 1:1'")
		expect(p.parse("Prvni Makabejská 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'Prvni Makabejská 1:1'")
		expect(p.parse("První Makabejska 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'První Makabejska 1:1'")
		expect(p.parse("První Makabejská 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'První Makabejská 1:1'")
		expect(p.parse("1. Makabejska 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1. Makabejska 1:1'")
		expect(p.parse("1. Makabejská 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1. Makabejská 1:1'")
		expect(p.parse("I. Makabejska 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I. Makabejska 1:1'")
		expect(p.parse("I. Makabejská 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I. Makabejská 1:1'")
		expect(p.parse("1 Makabejska 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1 Makabejska 1:1'")
		expect(p.parse("1 Makabejská 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1 Makabejská 1:1'")
		expect(p.parse("I Makabejska 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I Makabejska 1:1'")
		expect(p.parse("I Makabejská 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I Makabejská 1:1'")
		expect(p.parse("Prvni Mak 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'Prvni Mak 1:1'")
		expect(p.parse("První Mak 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'První Mak 1:1'")
		expect(p.parse("1. Mak 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1. Mak 1:1'")
		expect(p.parse("I. Mak 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I. Mak 1:1'")
		expect(p.parse("1 Mak 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1 Mak 1:1'")
		expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1Macc 1:1'")
		expect(p.parse("I Mak 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I Mak 1:1'")
		;
      return true;
    });
  });

  describe("Miscellaneous tests", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should return the expected language", function() {
      return expect(p.languages).toEqual(["cs"]);
    });
    it("should handle ranges (cs)", function() {
      expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2", "parsing: 'Titus 1:1 - 2'");
      expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2", "parsing: 'Matt 1-2'");
      return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3", "parsing: 'Phlm 2 - 3'");
    });
    it("should handle chapters (cs)", function() {
      expect(p.parse("Titus 1:1, kapitola 2").osis()).toEqual("Titus.1.1,Titus.2", "parsing: 'Titus 1:1, kapitola 2'");
      expect(p.parse("Matt 3:4 KAPITOLA 6").osis()).toEqual("Matt.3.4,Matt.6", "parsing: 'Matt 3:4 KAPITOLA 6'");
      expect(p.parse("Titus 1:1, kapitoly 2").osis()).toEqual("Titus.1.1,Titus.2", "parsing: 'Titus 1:1, kapitoly 2'");
      expect(p.parse("Matt 3:4 KAPITOLY 6").osis()).toEqual("Matt.3.4,Matt.6", "parsing: 'Matt 3:4 KAPITOLY 6'");
      expect(p.parse("Titus 1:1, kapitol 2").osis()).toEqual("Titus.1.1,Titus.2", "parsing: 'Titus 1:1, kapitol 2'");
      expect(p.parse("Matt 3:4 KAPITOL 6").osis()).toEqual("Matt.3.4,Matt.6", "parsing: 'Matt 3:4 KAPITOL 6'");
      expect(p.parse("Titus 1:1, kap. 2").osis()).toEqual("Titus.1.1,Titus.2", "parsing: 'Titus 1:1, kap. 2'");
      expect(p.parse("Matt 3:4 KAP. 6").osis()).toEqual("Matt.3.4,Matt.6", "parsing: 'Matt 3:4 KAP. 6'");
      expect(p.parse("Titus 1:1, kap 2").osis()).toEqual("Titus.1.1,Titus.2", "parsing: 'Titus 1:1, kap 2'");
      return expect(p.parse("Matt 3:4 KAP 6").osis()).toEqual("Matt.3.4,Matt.6", "parsing: 'Matt 3:4 KAP 6'");
    });
    it("should handle verses (cs)", function() {
      expect(p.parse("Exod 1:1 verše 3").osis()).toEqual("Exod.1.1,Exod.1.3", "parsing: 'Exod 1:1 verše 3'");
      expect(p.parse("Phlm VERŠE 6").osis()).toEqual("Phlm.1.6", "parsing: 'Phlm VERŠE 6'");
      expect(p.parse("Exod 1:1 verse 3").osis()).toEqual("Exod.1.1,Exod.1.3", "parsing: 'Exod 1:1 verse 3'");
      return expect(p.parse("Phlm VERSE 6").osis()).toEqual("Phlm.1.6", "parsing: 'Phlm VERSE 6'");
    });
    it("should handle 'and' (cs)", function() {
      expect(p.parse("Exod 1:1 a 3").osis()).toEqual("Exod.1.1,Exod.1.3", "parsing: 'Exod 1:1 a 3'");
      expect(p.parse("Phlm 2 A 6").osis()).toEqual("Phlm.1.2,Phlm.1.6", "parsing: 'Phlm 2 A 6'");
      expect(p.parse("Exod 1:1 srv. 3").osis()).toEqual("Exod.1.1,Exod.1.3", "parsing: 'Exod 1:1 srv. 3'");
      expect(p.parse("Phlm 2 SRV. 6").osis()).toEqual("Phlm.1.2,Phlm.1.6", "parsing: 'Phlm 2 SRV. 6'");
      expect(p.parse("Exod 1:1 srv 3").osis()).toEqual("Exod.1.1,Exod.1.3", "parsing: 'Exod 1:1 srv 3'");
      return expect(p.parse("Phlm 2 SRV 6").osis()).toEqual("Phlm.1.2,Phlm.1.6", "parsing: 'Phlm 2 SRV 6'");
    });
    it("should handle titles (cs)", function() {
      expect(p.parse("Ps 3 titul, 4:2, 5:titul").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1", "parsing: 'Ps 3 titul, 4:2, 5:titul'");
      return expect(p.parse("PS 3 TITUL, 4:2, 5:TITUL").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1", "parsing: 'PS 3 TITUL, 4:2, 5:TITUL'");
    });
    it("should handle 'ff' (cs)", function() {
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11", "parsing: 'Rev 3ff, 4:2ff'");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11", "parsing: 'REV 3 FF, 4:2 FF'");
    });
    it("should handle translations (cs)", function() {
      expect(p.parse("Lev 1 (B21)").osis_and_translations()).toEqual([["Lev.1", "B21"]]);
      return expect(p.parse("lev 1 b21").osis_and_translations()).toEqual([["Lev.1", "B21"]]);
    });
    it("should handle book ranges (cs)", function() {
      p.set_options({
        book_alone_strategy: "full",
        book_range_strategy: "include"
      });
      return expect(p.parse("První - Třetí  J").osis()).toEqual("1John.1-3John.1", "parsing: 'První - Třetí  J'");
    });
    return it("should handle boundaries (cs)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28", "parsing: '\u2014Matt\u2014'");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1", "parsing: '\u201cMatt 1:1\u201d'");
    });
  });

}).call(this);
