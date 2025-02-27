import { type FlatTable } from '~/entities/database-container'

export const flatTableList: FlatTable[] = [
  {
    id: '0008a724-6807-40bd-a898-cafe0f43e091',
    name: 'dashlets',
    display: 'dashlets',
    schemaId: '9f7b90ca-826a-44d0-b546-42bb60fdacc5',
    schemaName: 'ds_31',
    schemaDisplay: 'ds_31',
    databaseId: 'cd9c7fa5-43e3-4962-b69b-72a3c307bd27',
    databaseName: 'mi',
    databaseDisplay: 'mi',
    serviceId: 'f2567a13-2377-49b4-bd79-983ed9aa6e2b',
    serviceDisplay: 'LuxmsDemoDB',
    serviceHost: 'localhost',
    servicePort: 5432,
    serviceUsername: 'user',
    servicePassword: 'password',
    columns: [
      {
        id: 'ca452807-ad99-4608-826b-b916d234cb12',
        name: 'id',
        display: 'id',
        type: 'string',
      },
      {
        id: '3768e98a-e271-44fc-ae57-5e39af6e7083',
        name: 'parent_id',
        display: 'parent_id',
        type: 'string',
      },
      {
        id: '69f95555-7bc6-4d7d-b9c0-96b13cea6672',
        name: 'dashboard_id',
        display: 'dashboard_id',
        type: 'string',
      },
      {
        id: '8b4a9102-4be7-4bac-b887-3fe3f1efd257',
        name: 'view_class',
        display: 'view_class',
        type: 'string',
      },
      {
        id: '24b75d86-8b6e-4a7c-b4c7-9ef190644951',
        name: 'title',
        display: 'title',
        type: 'string',
      },
      {
        id: 'a30d3e60-0e73-43f3-8c40-b93dbbe06763',
        name: 'description',
        display: 'description',
        type: 'string',
      },
      {
        id: 'd817922b-7b56-4753-98bc-5370af10cee2',
        name: 'frame',
        display: 'frame',
        type: 'string',
      },
      {
        id: '25e9a217-ce4a-40c1-b79c-e18141621877',
        name: 'layout',
        display: 'layout',
        type: 'string',
      },
      {
        id: '774cf57f-8476-465b-a09a-e159abcd5b4a',
        name: 'length',
        display: 'length',
        type: 'string',
      },
      {
        id: 'e07dcf62-847e-4cfa-a8e8-1620e2068121',
        name: 'idx',
        display: 'idx',
        type: 'string',
      },
      {
        id: 'f40e7bb2-9f6d-49c3-8c04-57820ffafc36',
        name: 'srt',
        display: 'srt',
        type: 'string',
      },
      {
        id: '955e7cd9-6d5b-4838-a1ee-d2bb052238ad',
        name: 'config',
        display: 'config',
        type: 'string',
      },
      {
        id: 'fd13db4c-3408-4a5b-8a37-63b9762c8725',
        name: 'updated',
        display: 'updated',
        type: 'string',
      },
      {
        id: '15894b37-f704-43ef-bff8-bf8c77e32aec',
        name: 'created',
        display: 'created',
        type: 'string',
      },
    ],
  },
  {
    id: '000a4103-796f-4c7c-b9b3-2b8630bc4002',
    name: 'v98_uni_adb_stage_mart_db_tpe_n1',
    display: 'v98_uni_adb_stage_mart_db_tpe_n1',
    schemaId: '0ed2c9d9-b144-4da1-9f4d-38835f7520d1',
    schemaName: 'rdv_dlt',
    schemaDisplay: 'rdv_dlt',
    databaseId: '231151c4-cb23-4c6f-8748-f6e09154cd23',
    databaseName: 'dwh',
    databaseDisplay: 'dwh',
    serviceId: '6175fae1-d685-49c3-b9f4-c77ad093925f',
    serviceDisplay: 'GP_DWH',
    serviceHost: 'localhost',
    servicePort: 5432,
    serviceUsername: 'user',
    servicePassword: 'password',
    columns: [
      {
        id: '2809634a-2f9b-448a-bce4-3c84f76d714f',
        name: 'id',
        display: 'id',
        type: 'string',
      },
      {
        id: '3ffcd7f4-5383-44db-a8bd-58ccf4d9e4d3',
        name: 'req_id',
        display: 'req_id',
        type: 'string',
      },
      {
        id: 'ecae2a1e-9c22-4904-a5d3-e9ed4514fb0d',
        name: 'fed_okr_nm',
        display: 'fed_okr_nm',
        type: 'string',
      },
      {
        id: '99e89a7e-206b-479e-9475-b8684005a874',
        name: 'region_nm',
        display: 'region_nm',
        type: 'string',
      },
      {
        id: '6e397d9b-df9b-49b8-a247-753a9002b32d',
        name: 'req_tech_nm',
        display: 'req_tech_nm',
        type: 'string',
      },
      {
        id: 'dbbe473f-fba0-4ea7-8f92-d83d75b9762d',
        name: 'main_cd',
        display: 'main_cd',
        type: 'string',
      },
      {
        id: '8bfb27dc-83cf-472a-b33c-49faca3b33c3',
        name: 'tech',
        display: 'tech',
        type: 'string',
      },
      {
        id: 'f67e0f6b-404c-4e40-a5bc-8a1c61b60abd',
        name: 'rep_proc_desc',
        display: 'rep_proc_desc',
        type: 'string',
      },
      {
        id: '0300669e-a999-4a9a-8c9e-a99c92c5dd71',
        name: 'src_cd',
        display: 'src_cd',
        type: 'string',
      },
      {
        id: '8a95b2b1-1d44-462c-a993-22f62ab67a74',
        name: 'version_id',
        display: 'version_id',
        type: 'string',
      },
      {
        id: '5a845f95-5d71-498d-b555-a2a45d373365',
        name: 'deleted_flg',
        display: 'deleted_flg',
        type: 'string',
      },
      {
        id: 'bb0380e7-d93c-4408-b97b-e10c192a01bc',
        name: 'invalid_id',
        display: 'invalid_id',
        type: 'string',
      },
      {
        id: '9d4f143a-7dc5-4eae-a190-cad74fd1c3f8',
        name: 'valid_flg',
        display: 'valid_flg',
        type: 'string',
      },
      {
        type: 'string',
        id: '8b6bac79-9916-4429-b773-6f2f9ddcd142',
        name: 'hash_diff',
        display: 'hash_diff',
      },
      {
        type: 'string',
        id: 'bde02e90-4156-4ea1-8e5c-ad07ffeadeec',
        name: 'delta_record_mode',
        display: 'delta_record_mode',
      },
    ],
  },
  {
    id: '000b2160-1179-4869-a368-a81f3be571b4',
    name: 'wf_34pg625x4vd2jn3joi4y5a_ex_material_specification',
    display: 'wf_34pg625x4vd2jn3joi4y5a_ex_material_specification',
    schemaId: 'f1b0128a-0c47-40ad-b342-d0f337300109',
    schemaName: 'rdv_work',
    schemaDisplay: 'rdv_work',
    databaseId: '231151c4-cb23-4c6f-8748-f6e09154cd23',
    databaseName: 'dwh',
    databaseDisplay: 'dwh',
    serviceId: '6175fae1-d685-49c3-b9f4-c77ad093925f',
    serviceDisplay: 'GP_DWH',
    serviceHost: 'localhost',
    servicePort: 5432,
    serviceUsername: 'user',
    servicePassword: 'password',
    columns: [
      {
        type: 'string',
        id: 'a987d6ab-d745-4da8-92ff-361abd57d597',
        name: 'row_id',
        display: 'row_id',
      },
      {
        type: 'string',
        id: '410b5bb4-a21b-4a1f-8367-2ac4c3411aac',
        name: 'src',
        display: 'src',
      },
      {
        type: 'string',
        id: '10b2c1c5-0b70-4514-af01-0866e13c13ec',
        name: 'load_date',
        display: 'load_date',
      },
      {
        type: 'string',
        id: 'cc512524-eb6f-484c-b319-e5164d58b3b7',
        name: 'group1',
        display: 'group1',
      },
      {
        type: 'string',
        id: '2ac8bc61-8fd2-42cf-ade1-de89ef935602',
        name: 'business_key',
        display: 'business_key',
      },
      {
        type: 'string',
        id: '95672343-7395-4f0b-bfc3-e0a165e9b2e7',
        name: 'mat_name',
        display: 'mat_name',
      },
      {
        type: 'string',
        id: '4c48c722-f174-4a02-a5de-957dec3ecc76',
        name: 'location1',
        display: 'location1',
      },
      {
        type: 'string',
        id: '8edc521e-af93-4aaa-88d2-214bffbc2f9a',
        name: 'manufacturer',
        display: 'manufacturer',
      },
      {
        type: 'string',
        id: 'eda93e73-fd31-41df-a269-13828f072514',
        name: 'unit',
        display: 'unit',
      },
      {
        type: 'string',
        id: '7d9c4894-ba68-4e87-9801-f7d2cb8cefc6',
        name: 'unit_main',
        display: 'unit_main',
      },
      {
        type: 'string',
        id: '756bb9b0-75f3-4b98-a927-0e48cdb12218',
        name: 'list1',
        display: 'list1',
      },
      {
        type: 'string',
        id: '00d53477-d2d9-4659-a54e-8a190cec2419',
        name: 'act_date',
        display: 'act_date',
      },
      {
        type: 'string',
        id: 'ed5a21ab-32cc-4d11-8a34-5efb64b89cdd',
        name: 'code1',
        display: 'code1',
      },
      {
        type: 'string',
        id: '3c18a24b-adb2-4b4e-aa27-33c80065999e',
        name: 'code2',
        display: 'code2',
      },
      {
        type: 'string',
        id: 'b13032ec-01d5-41cb-bf0d-92af2eaa541f',
        name: 'code3',
        display: 'code3',
      },
      {
        type: 'string',
        id: '3870ce0c-cb23-47dd-b431-2e28bec33f4d',
        name: 'code4',
        display: 'code4',
      },
      {
        type: 'string',
        id: '6cf26549-3e20-4382-a322-c4a2b66b26c0',
        name: 'code5',
        display: 'code5',
      },
      {
        type: 'string',
        id: '2eba9d7d-53be-4735-a3f9-fbad55d245f6',
        name: 'flg1',
        display: 'flg1',
      },
      {
        type: 'string',
        id: 'bdfb8130-7283-4bd8-9c6b-2bb433fc28b1',
        name: 'flg2',
        display: 'flg2',
      },
      {
        type: 'string',
        id: '7084ced6-3e84-4aaa-a105-004f5c4e0da6',
        name: 'flg3',
        display: 'flg3',
      },
      {
        type: 'string',
        id: 'd5df2093-c3c2-463f-a73a-0741f1779629',
        name: 'flg4',
        display: 'flg4',
      },
      {
        type: 'string',
        id: 'fbe949b7-790c-4b5e-949e-5a262beaf1e8',
        name: 'flg5',
        display: 'flg5',
      },
      {
        type: 'string',
        id: '90811581-02bf-4be9-bb3a-d1eea85c39fe',
        name: 'flg6',
        display: 'flg6',
      },
      {
        type: 'string',
        id: 'f8598230-b0d8-49ec-8fc8-a37f9e5c80f9',
        name: 'code6',
        display: 'code6',
      },
      {
        type: 'string',
        id: '28233e8f-4ba5-4c05-b6c2-078c037028de',
        name: 'code7',
        display: 'code7',
      },
    ],
  },
]
