// GENERATED FILE - do not edit by hand.
//
// Demonstration data for offline mode. Produced from the seeded Django
// database by gen_demo_fixture.py so the shapes match the real API exactly.
//
// Licence expiry is stored as a day offset from today, so the demo keeps
// showing the intended green / yellow / red states whenever it runs.

export const DEMO_DATA = {
  "generated_at": "2026-11-08",
  "employers": [
    {
      "id": 37,
      "name": "Jos North General Hospital (Demo)",
      "type": "hospital",
      "lga": "Jos North",
      "contact_email": "jos@example.test",
      "approved": true,
      "hr_usernames": [
        "demo_hr2"
      ]
    },
    {
      "id": 38,
      "name": "Jos South Comprehensive Health Centre (Demo)",
      "type": "primary_health_centre",
      "lga": "Jos South",
      "contact_email": "jos@example.test",
      "approved": true,
      "hr_usernames": [
        "demo_hr3"
      ]
    },
    {
      "id": 40,
      "name": "Pankshin Mission Hospital (Demo)",
      "type": "hospital",
      "lga": "Pankshin",
      "contact_email": "pankshin@example.test",
      "approved": true,
      "hr_usernames": [
        "demo_hr5"
      ]
    },
    {
      "id": 36,
      "name": "Plateau Specialist Hospital (Demo)",
      "type": "hospital",
      "lga": "Jos North",
      "contact_email": "plateau@example.test",
      "approved": true,
      "hr_usernames": [
        "demo_hr1"
      ]
    },
    {
      "id": 39,
      "name": "Vom Christian Clinic (Demo)",
      "type": "clinic",
      "lga": "Jos South",
      "contact_email": "vom@example.test",
      "approved": true,
      "hr_usernames": [
        "demo_hr4"
      ]
    }
  ],
  "nurses": [
    {
      "id": 147,
      "nanm_id": "PLT-NUR-000062",
      "full_name": "Amina Adamu",
      "email": "amina.adamu@example.test",
      "phone": "08030000001",
      "licence_number": "PLT-LIC-DEMO-0001",
      "licence_expiry_offset_days": 400,
      "specialty": "General Nursing",
      "cadre": "Nurse",
      "employer_id": 36,
      "ward": "Medical Ward",
      "record_status": "approved",
      "employment_status": "confirmed",
      "employer_confirmed_at": true,
      "employment_decided_at": "2026-11-08T13:22:09.619289+00:00",
      "nin_last4": "0001",
      "has_account": true,
      "created_at": "2026-11-08T13:22:09.291872+00:00",
      "updated_at": "2026-11-08T16:15:57.499808+00:00",
      "documents": [
        {
          "id": 152,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:09.422603+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 148,
      "nanm_id": "PLT-NUR-000063",
      "full_name": "Grace Danjuma",
      "email": "grace.danjuma@example.test",
      "phone": "08030000002",
      "licence_number": "PLT-LIC-DEMO-0002",
      "licence_expiry_offset_days": 380,
      "specialty": "Midwifery",
      "cadre": "Midwife",
      "employer_id": 36,
      "ward": "Labour Ward",
      "record_status": "approved",
      "employment_status": "confirmed",
      "employer_confirmed_at": true,
      "employment_decided_at": "2026-11-08T13:22:12.791060+00:00",
      "nin_last4": "0002",
      "has_account": true,
      "created_at": "2026-11-08T13:22:12.476544+00:00",
      "updated_at": "2026-11-08T16:15:59.910492+00:00",
      "documents": [
        {
          "id": 153,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:12.604111+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 149,
      "nanm_id": "PLT-NUR-000064",
      "full_name": "Blessing Ibrahim",
      "email": "blessing.ibrahim@example.test",
      "phone": "08030000003",
      "licence_number": "PLT-LIC-DEMO-0003",
      "licence_expiry_offset_days": 350,
      "specialty": "Community Health",
      "cadre": "Community Health Nurse",
      "employer_id": 37,
      "ward": "Community Clinic",
      "record_status": "approved",
      "employment_status": "pending",
      "employer_confirmed_at": false,
      "employment_decided_at": null,
      "nin_last4": "0003",
      "has_account": false,
      "created_at": "2026-11-08T13:22:15.392126+00:00",
      "updated_at": "2026-11-08T16:15:59.951446+00:00",
      "documents": [
        {
          "id": 154,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:15.517027+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 150,
      "nanm_id": "PLT-NUR-000065",
      "full_name": "Esther Musa",
      "email": "esther.musa@example.test",
      "phone": "08030000004",
      "licence_number": "PLT-LIC-DEMO-0004",
      "licence_expiry_offset_days": 340,
      "specialty": "Paediatric Nursing",
      "cadre": "Nurse",
      "employer_id": 38,
      "ward": "Children's Ward",
      "record_status": "approved",
      "employment_status": "pending",
      "employer_confirmed_at": false,
      "employment_decided_at": null,
      "nin_last4": "0004",
      "has_account": true,
      "created_at": "2026-11-08T13:22:15.821517+00:00",
      "updated_at": "2026-11-08T16:16:02.436085+00:00",
      "documents": [
        {
          "id": 155,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:16.013577+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 151,
      "nanm_id": "PLT-NUR-000066",
      "full_name": "Mary Pam",
      "email": "mary.pam@example.test",
      "phone": "08030000005",
      "licence_number": "PLT-LIC-DEMO-0005",
      "licence_expiry_offset_days": 90,
      "specialty": "Mental Health",
      "cadre": "Nurse/Midwife",
      "employer_id": 36,
      "ward": "Psychiatric Unit",
      "record_status": "approved",
      "employment_status": "confirmed",
      "employer_confirmed_at": true,
      "employment_decided_at": "2026-11-08T13:22:19.283696+00:00",
      "nin_last4": "0005",
      "has_account": false,
      "created_at": "2026-11-08T13:22:18.950243+00:00",
      "updated_at": "2026-11-08T16:16:02.458582+00:00",
      "documents": [
        {
          "id": 156,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:19.071898+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 152,
      "nanm_id": "PLT-NUR-000067",
      "full_name": "Joy Terna",
      "email": "joy.terna@example.test",
      "phone": "08030000006",
      "licence_number": "PLT-LIC-DEMO-0006",
      "licence_expiry_offset_days": 20,
      "specialty": "General Nursing",
      "cadre": "Nurse",
      "employer_id": 39,
      "ward": "Outpatient Department",
      "record_status": "approved",
      "employment_status": "pending",
      "employer_confirmed_at": false,
      "employment_decided_at": null,
      "nin_last4": "0006",
      "has_account": false,
      "created_at": "2026-11-08T13:22:19.489235+00:00",
      "updated_at": "2026-11-08T16:16:02.540607+00:00",
      "documents": [
        {
          "id": 158,
          "document_type": "renewal",
          "decision": "pending",
          "uploaded_at": "2026-11-08T13:22:19.957162+00:00",
          "proposed_expiry": "2027-11-08"
        },
        {
          "id": 157,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:19.624389+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 153,
      "nanm_id": "PLT-NUR-000068",
      "full_name": "Hauwa Yakubu",
      "email": "hauwa.yakubu@example.test",
      "phone": "08030000007",
      "licence_number": "PLT-LIC-DEMO-0007",
      "licence_expiry_offset_days": -30,
      "specialty": "Midwifery",
      "cadre": "Midwife",
      "employer_id": 37,
      "ward": "Antenatal Clinic",
      "record_status": "approved",
      "employment_status": "confirmed",
      "employer_confirmed_at": true,
      "employment_decided_at": "2026-11-08T13:22:20.363523+00:00",
      "nin_last4": "0007",
      "has_account": false,
      "created_at": "2026-11-08T13:22:20.023639+00:00",
      "updated_at": "2026-11-08T16:16:02.639129+00:00",
      "documents": [
        {
          "id": 159,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:20.142201+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 154,
      "nanm_id": "PLT-NUR-000069",
      "full_name": "Ruth Bala",
      "email": "ruth.bala@example.test",
      "phone": "08030000008",
      "licence_number": "PLT-LIC-DEMO-0008",
      "licence_expiry_offset_days": -120,
      "specialty": "General Nursing",
      "cadre": "Nurse",
      "employer_id": 40,
      "ward": "Surgical Ward",
      "record_status": "approved",
      "employment_status": "pending",
      "employer_confirmed_at": false,
      "employment_decided_at": null,
      "nin_last4": "0008",
      "has_account": false,
      "created_at": "2026-11-08T13:22:20.568683+00:00",
      "updated_at": "2026-11-08T16:16:02.781330+00:00",
      "documents": [
        {
          "id": 160,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:20.705161+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 155,
      "nanm_id": null,
      "full_name": "Deborah James",
      "email": "deborah.james@example.test",
      "phone": "08030000009",
      "licence_number": "PLT-LIC-DEMO-0009",
      "licence_expiry_offset_days": 365,
      "specialty": "General Nursing",
      "cadre": "Nurse",
      "employer_id": 36,
      "ward": "Medical Ward",
      "record_status": "pending",
      "employment_status": "pending",
      "employer_confirmed_at": false,
      "employment_decided_at": null,
      "nin_last4": "0009",
      "has_account": false,
      "created_at": "2026-11-08T13:22:21.034555+00:00",
      "updated_at": "2026-11-08T16:16:02.876090+00:00",
      "documents": [
        {
          "id": 161,
          "document_type": "initial",
          "decision": "pending",
          "uploaded_at": "2026-11-08T13:22:21.197902+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 156,
      "nanm_id": null,
      "full_name": "Lydia Sani",
      "email": "lydia.sani@example.test",
      "phone": "08030000010",
      "licence_number": "PLT-LIC-DEMO-0010",
      "licence_expiry_offset_days": 200,
      "specialty": "Community Health",
      "cadre": "Community Health Nurse",
      "employer_id": 37,
      "ward": "Community Clinic",
      "record_status": "pending",
      "employment_status": "pending",
      "employer_confirmed_at": false,
      "employment_decided_at": null,
      "nin_last4": "0010",
      "has_account": false,
      "created_at": "2026-11-08T13:22:21.395713+00:00",
      "updated_at": "2026-11-08T16:16:02.927675+00:00",
      "documents": [
        {
          "id": 162,
          "document_type": "initial",
          "decision": "pending",
          "uploaded_at": "2026-11-08T13:22:21.514596+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 157,
      "nanm_id": null,
      "full_name": "Naomi Uche",
      "email": "naomi.uche@example.test",
      "phone": "08030000011",
      "licence_number": "PLT-LIC-DEMO-0011",
      "licence_expiry_offset_days": 300,
      "specialty": "General Nursing",
      "cadre": "Nurse",
      "employer_id": 38,
      "ward": "Outpatient Department",
      "record_status": "rejected",
      "employment_status": "pending",
      "employer_confirmed_at": false,
      "employment_decided_at": null,
      "nin_last4": "0011",
      "has_account": false,
      "created_at": "2026-11-08T13:22:21.736891+00:00",
      "updated_at": "2026-11-08T16:16:02.993034+00:00",
      "documents": [
        {
          "id": 163,
          "document_type": "initial",
          "decision": "pending",
          "uploaded_at": "2026-11-08T13:22:21.871225+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 158,
      "nanm_id": null,
      "full_name": "Rebecca Okafor",
      "email": "rebecca.okafor@example.test",
      "phone": "08030000012",
      "licence_number": "PLT-LIC-DEMO-0012",
      "licence_expiry_offset_days": 250,
      "specialty": "Paediatric Nursing",
      "cadre": "Nurse",
      "employer_id": 39,
      "ward": "Children's Ward",
      "record_status": "rejected",
      "employment_status": "pending",
      "employer_confirmed_at": false,
      "employment_decided_at": null,
      "nin_last4": "0012",
      "has_account": false,
      "created_at": "2026-11-08T13:22:22.173573+00:00",
      "updated_at": "2026-11-08T16:16:03.076426+00:00",
      "documents": [
        {
          "id": 164,
          "document_type": "initial",
          "decision": "pending",
          "uploaded_at": "2026-11-08T13:22:22.295562+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 159,
      "nanm_id": "PLT-NUR-000070",
      "full_name": "Sarah Nwosu",
      "email": "sarah.nwosu@example.test",
      "phone": "08030000013",
      "licence_number": "PLT-LIC-DEMO-0013",
      "licence_expiry_offset_days": 200,
      "specialty": "Mental Health",
      "cadre": "Nurse",
      "employer_id": 36,
      "ward": "Psychiatric Unit",
      "record_status": "suspended",
      "employment_status": "confirmed",
      "employer_confirmed_at": true,
      "employment_decided_at": "2026-11-08T13:22:22.975455+00:00",
      "nin_last4": "0013",
      "has_account": false,
      "created_at": "2026-11-08T13:22:22.576442+00:00",
      "updated_at": "2026-11-08T16:16:03.195443+00:00",
      "documents": [
        {
          "id": 165,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:22.696260+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 160,
      "nanm_id": "PLT-NUR-000071",
      "full_name": "Martha Garba",
      "email": "martha.garba@example.test",
      "phone": "08030000014",
      "licence_number": "PLT-LIC-DEMO-0014",
      "licence_expiry_offset_days": 200,
      "specialty": "Midwifery",
      "cadre": "Midwife",
      "employer_id": 37,
      "ward": "Labour Ward",
      "record_status": "revoked",
      "employment_status": "confirmed",
      "employer_confirmed_at": true,
      "employment_decided_at": "2026-11-08T13:22:23.594393+00:00",
      "nin_last4": "0014",
      "has_account": false,
      "created_at": "2026-11-08T13:22:23.189275+00:00",
      "updated_at": "2026-11-08T16:16:03.360317+00:00",
      "documents": [
        {
          "id": 166,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:23.321307+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 161,
      "nanm_id": null,
      "full_name": "Priscilla Rwang",
      "email": "priscilla.rwang@example.test",
      "phone": "08030000015",
      "licence_number": "PLT-LIC-DEMO-0015",
      "licence_expiry_offset_days": 300,
      "specialty": "General Nursing",
      "cadre": "Nurse",
      "employer_id": 38,
      "ward": "Medical Ward",
      "record_status": "flagged",
      "employment_status": "pending",
      "employer_confirmed_at": false,
      "employment_decided_at": null,
      "nin_last4": "0015",
      "has_account": false,
      "created_at": "2026-11-08T13:22:23.801611+00:00",
      "updated_at": "2026-11-08T16:16:03.457671+00:00",
      "documents": [
        {
          "id": 167,
          "document_type": "initial",
          "decision": "pending",
          "uploaded_at": "2026-11-08T13:22:23.963650+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 162,
      "nanm_id": "PLT-NUR-000072",
      "full_name": "Comfort Kalu",
      "email": "comfort.kalu@example.test",
      "phone": "08030000016",
      "licence_number": "PLT-LIC-DEMO-0016",
      "licence_expiry_offset_days": 320,
      "specialty": "Community Health",
      "cadre": "Community Health Nurse",
      "employer_id": 39,
      "ward": "Community Clinic",
      "record_status": "approved",
      "employment_status": "rejected",
      "employer_confirmed_at": false,
      "employment_decided_at": "2026-11-08T13:22:24.577560+00:00",
      "nin_last4": "0016",
      "has_account": false,
      "created_at": "2026-11-08T13:22:24.223237+00:00",
      "updated_at": "2026-11-08T16:16:03.542932+00:00",
      "documents": [
        {
          "id": 168,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:24.361686+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 163,
      "nanm_id": "PLT-NUR-000073",
      "full_name": "Faith Wuyep",
      "email": "faith.wuyep@example.test",
      "phone": "08030000017",
      "licence_number": "PLT-LIC-DEMO-0017",
      "licence_expiry_offset_days": 390,
      "specialty": "General Nursing",
      "cadre": "Nurse",
      "employer_id": 40,
      "ward": "Medical Ward",
      "record_status": "approved",
      "employment_status": "confirmed",
      "employer_confirmed_at": true,
      "employment_decided_at": "2026-11-08T13:22:25.107677+00:00",
      "nin_last4": "0017",
      "has_account": true,
      "created_at": "2026-11-08T13:22:24.787763+00:00",
      "updated_at": "2026-11-08T16:16:06.005232+00:00",
      "documents": [
        {
          "id": 169,
          "document_type": "initial",
          "decision": "approved",
          "uploaded_at": "2026-11-08T13:22:24.913304+00:00",
          "proposed_expiry": null
        }
      ]
    },
    {
      "id": 164,
      "nanm_id": null,
      "full_name": "Hope Zamani",
      "email": "hope.zamani@example.test",
      "phone": "08030000018",
      "licence_number": "PLT-LIC-DEMO-0018",
      "licence_expiry_offset_days": 280,
      "specialty": "General Nursing",
      "cadre": "Nurse",
      "employer_id": 36,
      "ward": "Surgical Ward",
      "record_status": "pending",
      "employment_status": "pending",
      "employer_confirmed_at": false,
      "employment_decided_at": null,
      "nin_last4": "0018",
      "has_account": false,
      "created_at": "2026-11-08T13:22:27.972496+00:00",
      "updated_at": "2026-11-08T16:16:06.029636+00:00",
      "documents": [
        {
          "id": 170,
          "document_type": "initial",
          "decision": "pending",
          "uploaded_at": "2026-11-08T13:22:28.110034+00:00",
          "proposed_expiry": null
        }
      ]
    }
  ],
  "accounts": [
    {
      "username": "demo_superadmin",
      "email": "superadmin@example.test",
      "password": "DemoPass123!",
      "role": "super_admin",
      "employer_id": null,
      "employer_name": null
    },
    {
      "username": "demo_supervisor",
      "email": "supervisor@example.test",
      "password": "DemoPass123!",
      "role": "supervisor",
      "employer_id": null,
      "employer_name": null
    },
    {
      "username": "demo_officer1",
      "email": "officer1@example.test",
      "password": "DemoPass123!",
      "role": "reviewer",
      "employer_id": null,
      "employer_name": null
    },
    {
      "username": "demo_hr1",
      "email": "hr1@example.test",
      "password": "DemoPass123!",
      "role": "hr",
      "employer_id": 36,
      "employer_name": "Plateau Specialist Hospital (Demo)"
    },
    {
      "username": "demo_hr2",
      "email": "hr2@example.test",
      "password": "DemoPass123!",
      "role": "hr",
      "employer_id": 37,
      "employer_name": "Jos North General Hospital (Demo)"
    },
    {
      "username": "demo_hr3",
      "email": "hr3@example.test",
      "password": "DemoPass123!",
      "role": "hr",
      "employer_id": 38,
      "employer_name": "Jos South Comprehensive Health Centre (Demo)"
    },
    {
      "username": "demo_hr4",
      "email": "hr4@example.test",
      "password": "DemoPass123!",
      "role": "hr",
      "employer_id": 39,
      "employer_name": "Vom Christian Clinic (Demo)"
    },
    {
      "username": "demo_hr5",
      "email": "hr5@example.test",
      "password": "DemoPass123!",
      "role": "hr",
      "employer_id": 40,
      "employer_name": "Pankshin Mission Hospital (Demo)"
    },
    {
      "username": "demo_nurse1",
      "email": "amina.adamu@example.test",
      "password": "DemoPass123!",
      "role": "nurse",
      "employer_id": 36,
      "employer_name": "Plateau Specialist Hospital (Demo)",
      "nurse_id": 147
    },
    {
      "username": "demo_nurse2",
      "email": "grace.danjuma@example.test",
      "password": "DemoPass123!",
      "role": "nurse",
      "employer_id": 36,
      "employer_name": "Plateau Specialist Hospital (Demo)",
      "nurse_id": 148
    },
    {
      "username": "demo_nurse3",
      "email": "esther.musa@example.test",
      "password": "DemoPass123!",
      "role": "nurse",
      "employer_id": 38,
      "employer_name": "Jos South Comprehensive Health Centre (Demo)",
      "nurse_id": 150
    },
    {
      "username": "demo_nurse4",
      "email": "faith.wuyep@example.test",
      "password": "DemoPass123!",
      "role": "nurse",
      "employer_id": 40,
      "employer_name": "Pankshin Mission Hospital (Demo)",
      "nurse_id": 163
    }
  ]
};

export const DEMO_PASSWORD = "DemoPass123!";
