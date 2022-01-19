import moment from 'moment'
import { useTranslation } from 'react-i18next';

export const useDetialCfg = () => {
    const { t } = useTranslation()
    const formarea = [
        {
            name: 'activityDesc',
            label: t('admin.activity.act_des'),
            require: true,
            err_message: t('admin.activity.input_activityDes')
        },
        {
            name: 'sponsor',
            label: t('admin.activity.sponsor'),
            require: false,
            message: t('admin.activity.spon_mes')
        },
        {
            name: 'coSponsor',
            label: t('admin.activity.co_sponsor'),
            require: false,
            message: t('admin.activity.co_sponmes')
        },
        {
            name: 'undertaker',
            label: t('admin.activity.undertaker'),
            require: false,
            message: t('admin.activity.und_mes')
        },
        {
            name: 'supporter',
            label: t('admin.activity.sup'),
            require: false,
            message: t('admin.activity.sup_mes')
        },
        {
            name: 'mediaPartner',
            label: t('admin.activity.mediapar'),
            require: false,
            message: t('admin.activity.med_mes')
        },
        {
            name: 'partner',
            label: t('admin.activity.partner'),
            require: false,
            message: t('admin.activity.par_mes')
        },
        {
            name: 'orgSignupExpiredTime',
            label: t('admin.activity.orgExpTime'),
            require: true,
            err_message: t('admin.activity.input_orgSignupExpiredTime')
        },
        {
            name: 'orgProgramSignupExpiredTime',
            label: t('admin.activity.orgProExpTime'),
            require: true,
            err_message: t('admin.activity.input_orgProgramSignupExpiredTime')
        },
        {
            name: 'studentSignupExpiredTime',
            label: t('admin.activity.stuExpTime'),
            require: true,
            err_message: t('admin.activity.input_studentSignupExpiredTime')
        },
        {
            name: 'firstApproveCommitTime',
            label: t('admin.activity.fstAppComTime'),
            require: true,
            err_message: t('admin.activity.input_firstApproveCommitTime')
        },
        {
            name: 'teacherFirstApproveExpiredTime',
            label: t('admin.activity.tFstAppExpTime'),
            require: true,
            err_message: t('admin.activity.input_teacherFirstApproveExpiredTime')
        },
        {
            name: 'summerFirstApprovePublicTime',
            label: t('admin.activity.sumFstAppPubTm'),
            require: true,
            err_message: t('admin.activity.input_summerFirstApprovePublicTime')
        },
        {
            name: 'studentMiddleCommitTime',
            label: t('admin.activity.stutMidTime'),
            require: true,
            err_message: t('admin.activity.input_studentMiddleCommitTime')
        },
        {
            name: 'teacherMiddleApproveExpiredTime',
            label: t('admin.activity.teaMidTime'),
            require: true,
            err_message: t('admin.activity.input_teacherMiddleApproveExpiredTime')
        },
        {
            name: 'needSummerMiddleApprove',
            label: t('admin.activity.summerMiddleApprove'),
            require: true
        },
        {
            name: 'summerMiddleApprovePublicTime',
            label: t('admin.activity.sumMidTime'),
            require: true,
            err_message: t('admin.activity.input_summerMiddleApprovePublicTime')
        },
        {
            name: 'studentEndCommitTime',
            label: t('admin.activity.stuEndTime'),
            require: true,
            err_message: t('admin.activity.input_studentEndCommitTime')
        },
        {
            name: 'teacherEndApproveExpiredTime',
            label: t('admin.activity.teaEndTime'),
            require: true,
            err_message: t('admin.activity.input_teacherEndApproveExpiredTime')
        },
        {
            name: 'summerEndApprovePublicTime',
            label: t('admin.activity.sumEndTime'),
            require: true,
            err_message: t('admin.activity.input_summerEndApprovePublicTime')
        }
    ]
    const timeObj = {}
    formarea.map((item, index) => index >= 7 ? item.name : null).forEach(it => {
        if (it) {
            timeObj[it] = moment(new Date())
        }
    })

    const formlimit = [
        {
            name: 'maxProgramNumOrg',
            label: t('admin.activity.orglimit.0') + `<span style={{color:'red'}}>${t('admin.activity.orglimit.1')}</span>` + t('admin.activity.orglimit.2'),
            require: true,
            err_message: t('admin.activity.orgmes')
        },
        {
            name: 'maxProgramNumTeacher',
            label: t('admin.activity.tutorlimit.0') + `<span style={{color:'red'}}>${t('admin.activity.tutorlimit.1')}</span>` + t('admin.activity.tutorlimit.2'),
            require: true,
            err_message: t('admin.activity.tutormes')
        },
    ]
    const formbonuesrole1 =
    {
        title: t('admin.activity.stubonuesrule'),
        fielditems: [
            {
                name: 'bonusPayStudentDuring1',
                label: t('admin.activity.bonusmid'),
                required: { required: false, type: 'number', min: 0, max: 100, transform(value) { if (value) { return Number(value) } } },
                message: t('admin.activity.bonusrole_unit'),
            },
            {
                name: 'bonusPayStudentEnding1',
                label: t('admin.activity.bonusend'),
                required: { required: false, type: 'number', min: 0, max: 100, transform(value) { if (value) { return Number(value) } } },
                message: t('admin.activity.bonusrole_unit'),
                dependencies: 'bonusPayStudentDuring1'
            }
        ]
    }
    const formbonuesrole2 =
    {
        title: t('admin.activity.teabonuesrule'),
        fielditems: [
            {
                name: 'bonusPayTeacherDuring2',
                label: t('admin.activity.bonusmid'),
                required: { required: false, type: 'number', min: 0, max: 100, transform(value) { if (value) { return Number(value) } } },
                message: t('admin.activity.bonusrole_unit')
            },
            {
                name: 'bonusPayTeacherEnding2',
                label: t('admin.activity.bonusend'),
                required: { required: false, type: 'number', min: 0, max: 100, transform(value) { if (value) { return Number(value) } } },
                message: t('admin.activity.bonusrole_unit'),
                dependencies: 'bonusPayTeacherDuring2'
            }
        ]
    }

    const aqvalue = {
        question1: t(`admin.activity.question1val`),
        required1: 1
    }
    return {
        formarea,
        timeObj,
        aqvalue,
        formbonuesrole1,
        formbonuesrole2,
        formlimit
    }
}