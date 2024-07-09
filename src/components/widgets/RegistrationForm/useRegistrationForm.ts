import {useState} from 'react'
import {useForm} from '../../../hooks'
import WebClient from 'web-client-starter/lib'
import type {FormInputType} from '../../atoms'

const options = {
  applicationFor: [
    {label: 'Summer Internship', value: 'summerInternship'},
    {label: 'Teacher skills development program', value: 'teachersSkillDevelopmentProgram'}
  ],
  coursePursuing: [
    {label: '', value: ''},
    {label: 'Diploma', value: 'diploma'},
    {label: 'B.Tech', value: 'btech'}
  ],
  pursuingYear: [
    {label: '', value: ''},
    {label: '1st Year', value: '1'},
    {label: '2nd Year', value: '2'},
    {label: '3rd Year', value: '3'},
    {label: '4th Year', value: '4'}
  ],
  stream: [
    {label: '', value: ''},
    {label: 'EEE', value: 'eee'},
    {label: 'ECE', value: 'ece'}
  ],
  module: [
    {label: '', value: ''},
    {label: 'Embedded system (Robotics)', value: 'embedded'},
    {label: 'Internet of things (IOT)', value: 'iot'}
  ]
} as const

type ApplicationForOptions = (typeof options.applicationFor)[number]['value']
type CoursePursuingOptions = (typeof options.coursePursuing)[number]['value']
type PursuingYearOptions = (typeof options.pursuingYear)[number]['value']
type StreamOptions = (typeof options.stream)[number]['value']
type ModuleOptions = (typeof options.module)[number]['value']
type RegistrationFormValuesType = {
  applicationFor: ApplicationForOptions
  firstName: string
  lastName: string
  collegeName: string
  contactNo: number
  coursePursuing: CoursePursuingOptions
  stream: StreamOptions
  pursuingYear: PursuingYearOptions
  module: ModuleOptions
  email: string
  consent: boolean
}

type UseRegistrationFormType = () => {
  handleSubmit: () => void
  submitted: boolean
  onChange: <U extends keyof RegistrationFormValuesType>(keyName: U, value: RegistrationFormValuesType[U]) => void
  onSubmit: (handleSubmit: (values: RegistrationFormValuesType) => void) => (event: React.FormEvent) => void
  values: RegistrationFormValuesType
  responseMessage: string
  error: boolean
  fields: FormInputType[]
}

export const useRegistrationForm: UseRegistrationFormType = () => {
  const initialValue: RegistrationFormValuesType = {
    applicationFor: 'summerInternship',
    firstName: '',
    lastName: '',
    collegeName: '',
    contactNo: 0,
    coursePursuing: '',
    stream: '',
    pursuingYear: '',
    module: '',
    email: '',
    consent: false
  }
  const {values, onChange, onSubmit} = useForm(initialValue)
  const [submitted, setSubmitted] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [error, setError] = useState(false)

  const isInvalidContactNo = values.contactNo !== 0 && values.contactNo.toString().length !== 10
  const formInputsForStudents: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'College Name',
      required: true,
      value: values.collegeName,
      onChange: event => {
        onChange('collegeName', event.target.value)
      }
    },
    {
      inputType: 'selectField',
      value: values.coursePursuing,
      label: 'Course Pursuing',
      required: true,
      defaultValue: options.coursePursuing.find(option => option.value === values.coursePursuing),
      handleChange: value => {
        onChange('coursePursuing', value as CoursePursuingOptions)
      },
      options: options.coursePursuing
    },
    {
      inputType: 'selectField',
      value: values.stream,
      label: 'Stream/Branch',
      required: true,
      defaultValue: options.stream.find(option => option.value === values.stream),
      handleChange: value => {
        onChange('stream', value as StreamOptions)
      },
      options: options.stream
    },
    {
      inputType: 'selectField',
      value: values.pursuingYear,
      label: 'Pursuing Year',
      required: true,
      defaultValue: options.pursuingYear.find(option => option.value === values.pursuingYear),
      handleChange: value => {
        onChange('pursuingYear', value as PursuingYearOptions)
      },
      options: values.coursePursuing === 'diploma' ? options.pursuingYear.slice(0, -1) : options.pursuingYear
    }
  ]

  const fields: FormInputType[] = [
    {
      inputType: 'selectField',
      value: values.applicationFor,
      label: 'Application for',
      required: true,
      defaultValue: options.applicationFor.find(option => option.value === values.applicationFor),
      handleChange: value => {
        onChange('applicationFor', value as ApplicationForOptions)
      },
      options: options.applicationFor
    },
    {
      inputType: 'textField',
      label: 'First Name',
      required: true,
      value: values.firstName,
      onChange: event => {
        onChange('firstName', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Last Name',
      required: true,
      value: values.lastName,
      onChange: event => {
        onChange('lastName', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Contact No.',
      required: true,
      value: values.contactNo === 0 ? '' : values.contactNo,
      type: 'number',
      onChange: event => {
        onChange('contactNo', +event.target.value)
      },
      error: isInvalidContactNo,
      helperText: isInvalidContactNo ? 'You have entered invalid contact no.' : ''
    },
    {
      inputType: 'textField',
      label: 'Email Address',
      required: true,
      type: 'email',
      value: values.email,
      onChange: event => {
        onChange('email', event.target.value)
      }
    },
    {
      inputType: 'selectField',
      value: values.module,
      label: 'Select Technology/Course',
      required: true,
      defaultValue: options.module.find(option => option.value === values.module),
      handleChange: value => {
        onChange('module', value as ModuleOptions)
      },
      options: options.module
    }
  ]

  const handleSubmit = () => {
    setError(false)
    setResponseMessage('')
    WebClient.post({
      baseUrl: '/api',
      path: '/contact',
      body: values
    })
      .then(() => {
        setSubmitted(true)
        setResponseMessage('Thank you contacting us! Our team will reach out to you soon.')
      })
      .catch(() => {
        setError(true)
        setResponseMessage('Something went wrong, please try again!')
      })
  }
  return {
    handleSubmit,
    responseMessage,
    error,
    onSubmit,
    submitted,
    fields:
      values.applicationFor !== 'teachersSkillDevelopmentProgram'
        ? [...fields.slice(0, -2), ...formInputsForStudents, ...fields.slice(-2)]
        : fields,
    values,
    onChange
  }
}
