const express = require('express');
const app = express()

const NestedJson = {
  ShpInfReqDef: {
    Id: "7e035469-2576-4a41-af2e-1732a0f640c8",

    Nm: "Material Safety for Egypt - EG",

    LedOwnOrgn: {
      CtryCd: "EG",
    },
    "DrvdFromShpInfReqDef" : {
      "Id" : "d6074b99-8035-4587-9f32-33dda099d562"
    },
    ApplyAllInd: false,

    PrsnDatSenstyClssLvl: "Low",

    QuickGuideEnabledInd: false,

    UICmpt: {
      CmptNm: "MaterialIEG",

      DisplayTtl: "Material Safety Report",

      Tooltip: "",

      CmptTy: "Composed",

      DisplayDsc: {
        DisplayTxt:
          "Please upload Material Safety Doc contains liquid or powder items.",
      },
    },

    Ent: [
      {
        Id: "411b8306-c97e-4ad4-aebc-218ba22aa2f7",

        Nm: "Material Safety Upload Required",

        Dsc: "Material Safety Report Upload Required Description",

        isImg: false,

        isExcl: false,

        isMan: true,

        Ent: [
          {
            Id: "d2634bf5-6e62-49c3-878d-a8e601c8229e",

            Nm: "Material Safety Items Document",

            Dsc: "Material Safety Items  Document",

            isImg: false,

            isExcl: false,

            isMan: false,

            Ent: [
              {
                Id: "ecac5b6d-6cac-4321-93e5-c738ccd19c1a",

                Nm: "Material Safety Report Line Item Uploader Entity",

                Dsc: "Material Safety Report Line Uploader Desc",

                isImg: true,

                isExcl: false,

                isMan: true,

                Att: [
                  {
                    Id: "85faa5b6-13bb-41a8-aa99-d71fff42e64d",

                    Nm: "Document Family Code",

                    Dsc: "Document Family Code",

                    AttTy: "Constant",

                    DflVal: "ENT",

                    isExcl: false,

                    isMan: true,

                    AttMsgPos: [
                      {
                        Ver: "3.002",

                        MsgTyCd: "DocImgMsg",

                        xPath: "DocImgMsg/Bd/Doc/DocFamCd",
                      },
                    ],
                  },

                  {
                    Id: "53d73d3d-d186-408a-bac4-92aadf3ff73b",

                    Nm: "Document Type Code",

                    Dsc: "Document Type Code",

                    AttTy: "Constant",

                    DflVal: "ENT",

                    isExcl: false,

                    isMan: true,

                    AttMsgPos: [
                      {
                        Ver: "3.002",

                        MsgTyCd: "DocImgMsg",

                        xPath: "DocImgMsg/Bd/Doc/DocTyCd",
                      },
                    ],
                  },

                  {
                    Id: "cbdb089f-5816-4ec8-84fe-a951c74cd0a5",

                    Nm: "Material Safety Report Line Item For Shipment",

                    AttTy: "UserEntry",

                    isExcl: false,

                    isMan: true,

                    MaxFlSz: 6000,

                    MaxFlCnt: 20,

                    AlwExt: ["pdf", "jpeg", "jpg", "png", "bmp", "docx"],

                    UICmpt: {
                      CmptNm: "MaterialReportImg",

                      DisplayTtl: "",

                      Hint: "Upload File(s)",

                      Tooltip: "",

                      CmptTy: "FileUploader",

                      DisplayDsc: {
                        DisplayTxt: "",
                      },
                    },

                    AttMsgPos: [
                      {
                        Ver: "12.030",

                        MsgTyCd: "ShpPcdDetailsMsg",

                        xPath: "ShpPcdDetailsMsg/Bd/Shp/ShpDoc/Img/Loc",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};


function convertJson(obj) {
  const convertedJson = {
    InfReq: {
      InfReqId: "",
      InfDefId: obj.ShpInfReqDef.Id,
      InfDatEntRec: convertEntities(obj.ShpInfReqDef.Ent)
    }
  };
  
  return convertedJson;
}

function convertEntities(entities) {
  if (!entities || entities.length === 0) {
    return ;
  }
  return entities.map(entity => {
    const convertedEntity = {
      "@InfDatEntId": entity.Id,
      InfDatEntRec: convertEntities(entity.Ent)
    };
    
    if(entity.Att) {
      convertedEntity.Att = convertAttributes(entity.Att);
    }
    return convertedEntity;
  });
}

function convertAttributes(attributes) {
  return attributes.map(attribute => {
    return {
      "@AttDefId": attribute.Id,
      Val: ""
    };
  });
}


const result = convertJson(NestedJson)

app.get('/', (req, res) => {
  res.send(result);
})


app.listen(3000, () => {
  console.log('Server running on port 3000')
})

