import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';
import axiosInstance from '../auth/AxiosConfig';
import './steps.scss';
import ComponentCard from '../../components/ComponentCard';


import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

class FormSteps extends Component {
  constructor(props) {
    super(props);
    this.sampleStore = {
      name: '',
      social_name: '',
      health_number: '',
      fiscal_number: '',
      birthdate: '',
      sex: '',
      color: '',
      mother_name: '',
      country: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      postalCode: '',
      city: '',
      unit: '',
      zone: '',
      weight: '',
      education: '',
      job: '',
      type: '',
      work_related: '',
      first_symptoms_at: '',
      infection_source: '',
      clinical_form: '',
      associated_information: '',
      associated_information_other: '',
      exams: [],
      diagnostic_conclusion: '',
    };
    this.stepZillaRef = React.createRef(); 
  }

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    };
  }

  jumpToStep = (step) => {
    if (this.stepZillaRef.current) {
      this.stepZillaRef.current.goToStep(step);
    }
  };
  

  handleSubmit = async () => {
    const patientData = {
      name: this.sampleStore.name,
      social_name: this.sampleStore.social_name,
      health_number: this.sampleStore.health_number,
      fiscal_number: this.sampleStore.fiscal_number,
      birthdate: this.sampleStore.birthdate,
      sex: this.sampleStore.sex,
      color: this.sampleStore.color,
      mother_name: this.sampleStore.mother_name,
      country: this.sampleStore.country,
      phone: this.sampleStore.phone,
      address_line_1: this.sampleStore.addressLine1,
      address_line_2: this.sampleStore.addressLine2,
      postal_code: this.sampleStore.postalCode,
      city: this.sampleStore.city,
      unit: this.sampleStore.unit,
      zone: this.sampleStore.zone,
      attributes: {
        weight: this.sampleStore.weight,
        education: this.sampleStore.education,
        job: this.sampleStore.job,
      },
    };

    try {
      const patientResponse = await axiosInstance.post('/patient', patientData);
      const patientId = patientResponse.data._id;

      const caseData = {
        patient_id: patientId,
        type: this.sampleStore.type,
        work_related: this.sampleStore.work_related,
        first_symptoms_at: this.sampleStore.first_symptoms_at,
        infection_source: this.sampleStore.infection_source,
        clinical_form: this.sampleStore.clinical_form,
        associated_information: this.sampleStore.associated_information,
        associated_information_other: this.sampleStore.associated_information_other,
        exams: this.sampleStore.exams,
        diagnostic_conclusion: this.sampleStore.diagnostic_conclusion,
      };

      await axiosInstance.post('/case', caseData);
      alert('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data', error);
      alert('Error submitting data');
    }
  };

  render() {
    const steps = [
      {
        name: 'Identificação do Individuo',
        component: (
          <Step1
            getStore={() => this.getStore()}
            updateStore={(u) => {
              this.updateStore(u);
            }}
            jumpToStep={this.jumpToStep}
          />
        ),
      },
      {
        name: 'Dados Residenciais',
        component: (
          <Step2
            getStore={() => this.getStore()}
            updateStore={(u) => {
              this.updateStore(u);
            }}
            jumpToStep={this.jumpToStep}
          />
        ),
      },
      {
        name: 'Dados da notificação',
        component: (
          <Step3
            getStore={() => this.getStore()}
            updateStore={(u) => {
              this.updateStore(u);
            }}
            jumpToStep={this.jumpToStep}
          />
        ),
      },
      {
        name: 'Doenças, infecções ...',
        component: (
          <Step4
            getStore={() => this.getStore()}
            updateStore={(u) => {
              this.updateStore(u);
            }}
            jumpToStep={this.jumpToStep}
          />
        ),
      },
      {
        name: 'Conclusão diagnóstica',
        component: (
          <Step5
            getStore={() => this.getStore()}
            updateStore={(u) => {
              this.updateStore(u);
            }}
            handleSubmit={this.handleSubmit}
            jumpToStep={this.jumpToStep}
          />
        ),
      },
    ];

    return (
      <>
        <ComponentCard title="Casos">
          <div className="example">
            <div className="step-progress">
              <StepZilla
                ref={this.stepZillaRef} 
                steps={steps}
                stepsNavigation={true}
                prevBtnOnLastStep={true}
              />
            </div>
          </div>
        </ComponentCard>
      </>
    );
  }
}

export default FormSteps;
