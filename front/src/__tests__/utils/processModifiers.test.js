import processModifiers from "../../utils/processModifiers";

describe("processModifiers() Tests", () => {
  it("should return empty string if doesnt pass modifiers", () => {
    expect(processModifiers()).toEqual("");
    expect(processModifiers("Container-Main")).toEqual("");
  });

  describe("BEM-like style", () => {
    it("should return correct string of classes. For params: 'Container-Main', [['modifierName', 'modifierValue']]", () => {
      expect(
        processModifiers("Container-Main", [["modifierName", "modifierValue"]])
      ).toEqual("Container-Main_modifierName_modifierValue");
    });

    it("should return correct string of classes. If modifierValue=false]]", () => {
      expect(
        processModifiers("Container-Main", [["modifierName", false]])
      ).toEqual("Container-Main_modifierName");
    });

    it("should return correct string of classes. If modifierValue=undefined]]", () => {
      expect(
        processModifiers("Container-Main", [["modifierName", undefined]])
      ).toEqual("Container-Main_modifierName");
    });

    it("should return correct string of classes. If modifierValue=null]]", () => {
      expect(
        processModifiers("Container-Main", [["modifierName", null]])
      ).toEqual("Container-Main_modifierName");
    });

    it("should return correct string of classes with multiple modifiers name/value pairs]]", () => {
      expect(
        processModifiers("Container-Main", [
          ["modifierName1", "modifierValue1"],
          ["modifierName2", "modifierValue2"],
          ["modifierName3", "modifierValue3"],
          ["modifierName4", "modifierValue4"],
        ])
      ).toEqual(
        "Container-Main_modifierName1_modifierValue1 Container-Main_modifierName2_modifierValue2 Container-Main_modifierName3_modifierValue3 Container-Main_modifierName4_modifierValue4"
      );
    });

    it("should return correct string of classes with multiple modifiers name/value pairs, and some pairs without value]]", () => {
      expect(
        processModifiers("Container-Main", [
          ["modifierName1", "modifierValue1"],
          ["modifierName2", "modifierValue2"],
          ["modifierName3"],
          ["modifierName4", "modifierValue4"],
        ])
      ).toEqual(
        "Container-Main_modifierName1_modifierValue1 Container-Main_modifierName2_modifierValue2 Container-Main_modifierName3 Container-Main_modifierName4_modifierValue4"
      );
    });
  });
});
