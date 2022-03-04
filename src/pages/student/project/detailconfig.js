import moment from 'moment'
import { useTranslation } from 'react-i18next'
export const useDetialCfg = () => {
    const { t } = useTranslation()
    const formarea = [
        {
            name: 'activityDesc',
            label: t('admin.activity.act_des'),
            label_en: t('admin.activity.act_des_en'),
            require: true,
            err_message: t('admin.activity.input_activityDes'),
            err_message_en: t('admin.activity.input_activityDes_en')
        },
        {
            name: 'sponsor',
            label: t('admin.activity.sponsor'),
            label_en: t('admin.activity.sponsor_en'),
            require: false,
            message: t('admin.activity.spon_mes'),
            message_en: t('admin.activity.spon_mes_en')
        },
        {
            name: 'coSponsor',
            label: t('admin.activity.co_sponsor'),
            label_en: t('admin.activity.co_sponsor_en'),
            require: false,
            message: t('admin.activity.co_sponmes'),
            message_en: t('admin.activity.co_sponmes_en')
        },
        {
            name: 'undertaker',
            label: t('admin.activity.undertaker'),
            label_en: t('admin.activity.undertaker_en'),
            require: false,
            message: t('admin.activity.und_mes'),
            message_en: t('admin.activity.und_mes_en')
        },
        {
            name: 'supporter',
            label: t('admin.activity.sup'),
            label_en: t('admin.activity.sup_en'),
            require: false,
            message: t('admin.activity.sup_mes'),
            message_en: t('admin.activity.sup_mes_en')
        },
        {
            name: 'mediaPartner',
            label: t('admin.activity.mediapar'),
            label_en: t('admin.activity.mediapar_en'),
            require: false,
            message: t('admin.activity.med_mes'),
            message_en: t('admin.activity.med_mes_en')
        },
        {
            name: 'partner',
            label: t('admin.activity.partner'),
            label_en: t('admin.activity.partner_en'),
            require: false,
            message: t('admin.activity.par_mes'),
            message_en: t('admin.activity.par_mes_en')
        }]
    const formareamix = [
        {
            name: 'activityDesc',
            label: t('admin.activity.act_des'),
            label_en: t('admin.activity.act_des_en'),
            require: true,
            err_message: t('admin.activity.input_activityDes'),
            err_message_en: t('admin.activity.input_activityDes_en')
        },
        {
            name: 'activityDescEN',
            label: t('admin.activity.act_des_en'),
            require: true,
            err_message: t('admin.activity.input_activityDes'),
            err_message_en: t('admin.activity.input_activityDes_en')
        },
        {
            name: 'sponsor',
            label: t('admin.activity.sponsor'),
            label_en: t('admin.activity.sponsor_en'),
            require: false,
            message: t('admin.activity.spon_mes'),
        },
        {
            name: 'sponsorEN',
            label: t('admin.activity.sponsor_en'),
            require: false,
            message: t('admin.activity.spon_mes_en')
        },
        {
            name: 'coSponsor',
            label: t('admin.activity.co_sponsor'),
            label_en: t('admin.activity.co_sponsor_en'),
            require: false,
            message: t('admin.activity.co_sponmes'),
        },
        {
            name: 'coSponsorEN',
            label: t('admin.activity.co_sponsor_en'),
            require: false,
            message: t('admin.activity.co_sponmes_en')
        },
        {
            name: 'undertaker',
            label: t('admin.activity.undertaker'),
            label_en: t('admin.activity.undertaker_en'),
            require: false,
            message: t('admin.activity.und_mes'),
        },
        {
            name: 'undertakerEN',
            label: t('admin.activity.undertaker_en'),
            require: false,
            message: t('admin.activity.und_mes_en')
        },
        {
            name: 'supporter',
            label: t('admin.activity.sup'),
            label_en: t('admin.activity.sup_en'),
            require: false,
            message: t('admin.activity.sup_mes'),
        },
        {
            name: 'supporterEN',
            label: t('admin.activity.sup_en'),
            require: false,
            message: t('admin.activity.sup_mes_en')
        },
        {
            name: 'mediaPartner',
            label: t('admin.activity.mediapar'),
            label_en: t('admin.activity.mediapar_en'),
            require: false,
            message: t('admin.activity.med_mes')
        },
        {
            name: 'mediaPartnerEN',
            label: t('admin.activity.mediapar_en'),
            require: false,
            message: t('admin.activity.med_mes_en')
        },
        {
            name: 'partner',
            label: t('admin.activity.partner'),
            label_en: t('admin.activity.partner_en'),
            require: false,
            message: t('admin.activity.par_mes')
        },
        {
            name: 'partnerEN',
            label: t('admin.activity.partner_en'),
            require: false,
            message: t('admin.activity.par_mes_en')
        }]
    const formTime = [
        {
            name: 'orgSignupExpiredTime',
            label: t('admin.activity.orgExpTime'),
            label_en: t('admin.activity.orgExpTime_en'),
            require: true,
            err_message: t('admin.activity.input_orgSignupExpiredTime')
        },
        {
            name: 'orgProgramSignupExpiredTime',
            label: t('admin.activity.orgProExpTime'),
            label_en: t('admin.activity.orgProExpTime_en'),
            require: true,
            err_message: t('admin.activity.input_orgProgramSignupExpiredTime')
        },
        {
            name: 'studentSignupExpiredTime',
            label: t('admin.activity.stuExpTime'),
            label_en: t('admin.activity.stuExpTime_en'),
            require: true,
            err_message: t('admin.activity.input_studentSignupExpiredTime')
        },
        {
            name: 'firstApproveCommitTime',
            label: t('admin.activity.fstAppComTime'),
            label_en: t('admin.activity.fstAppComTime_en'),
            require: true,
            err_message: t('admin.activity.input_firstApproveCommitTime')
        },
        {
            name: 'teacherFirstApproveExpiredTime',
            label: t('admin.activity.tFstAppExpTime'),
            label_en: t('admin.activity.tFstAppExpTime_en'),
            require: true,
            err_message: t('admin.activity.input_teacherFirstApproveExpiredTime')
        },
        {
            name: 'summerFirstApprovePublicTime',
            label: t('admin.activity.sumFstAppPubTm'),
            label_en: t('admin.activity.sumFstAppPubTm_en'),
            require: true,
            err_message: t('admin.activity.input_summerFirstApprovePublicTime')
        },
        {
            name: 'needMiddleApprove',
            label: t('admin.activity.middleApprove'),
            label_en: t('admin.activity.middleApprove_en'),
            require: true
        },
        {
            name: 'studentMiddleCommitTime',
            label: t('admin.activity.stutMidTime'),
            label_en: t('admin.activity.stutMidTime_en'),
            require: true,
            err_message: t('admin.activity.input_studentMiddleCommitTime')
        },
        {
            name: 'teacherMiddleApproveExpiredTime',
            label: t('admin.activity.teaMidTime'),
            label_en: t('admin.activity.teaMidTime_en'),
            require: true,
            err_message: t('admin.activity.input_teacherMiddleApproveExpiredTime')
        },
        {
            name: 'needSummerMiddleApprove',
            label: t('admin.activity.summerMiddleApprove'),
            label_en: t('admin.activity.summerMiddleApprove_en'),
            require: true
        },
        {
            name: 'summerMiddleApprovePublicTime',
            label: t('admin.activity.sumMidTime'),
            label_en: t('admin.activity.sumMidTime_en'),
            require: true,
            err_message: t('admin.activity.input_summerMiddleApprovePublicTime')
        },
        {
            name: 'studentEndCommitTime',
            label: t('admin.activity.stuEndTime'),
            label_en: t('admin.activity.stuEndTime_en'),
            require: true,
            err_message: t('admin.activity.input_studentEndCommitTime')
        },
        {
            name: 'teacherEndApproveExpiredTime',
            label: t('admin.activity.teaEndTime'),
            label_en: t('admin.activity.teaEndTime_en'),
            require: true,
            err_message: t('admin.activity.input_teacherEndApproveExpiredTime')
        },
        {
            name: 'summerEndApprovePublicTime',
            label: t('admin.activity.sumEndTime'),
            label_en: t('admin.activity.sumEndTime_en'),
            require: true,
            err_message: t('admin.activity.input_summerEndApprovePublicTime')
        }
    ]

    const timeObj: any = {}
    formTime.map((item, index) => item.name).forEach(it => {
        if (it) {
            timeObj[it] = moment(new Date())
        }
    })

    const formlimit = [
        {
            name: 'maxProgramNumOrg',
            label: t('admin.activity.orglimit.0') + `<span style={{color:'red'}}>${t('admin.activity.orglimit.1')}</span>` + t('admin.activity.orglimit.2'),
            label_en: t('admin.activity.orglimit_en.0') + `<span style={{color:'red'}}>${t('admin.activity.orglimit_en.1')}</span>` + t('admin.activity.orglimit_en.2'),
            require: true,
            err_message: t('admin.activity.orgmes')
        },
        {
            name: 'maxProgramNumTeacher',
            label: t('admin.activity.tutorlimit.0') + `<span style={{color:'red'}}>${t('admin.activity.tutorlimit.1')}</span>` + t('admin.activity.tutorlimit.2'),
            label_en: t('admin.activity.tutorlimit_en.0') + `<span style={{color:'red'}}>${t('admin.activity.tutorlimit_en.1')}</span>` + t('admin.activity.tutorlimit_en.2'),
            require: true,
            err_message: t('admin.activity.tutormes')
        },
    ]

    const formbonuesrole1 =
    {
        title: t('admin.activity.stubonuesrule'),
        title_en: t('admin.activity.stubonuesrule_en'),
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
        title_en: t('admin.activity.teabonuesrule_en'),
        fielditems: [
            {
                name: 'bonusPayTeacherDuring2',
                label: t('admin.activity.bonusmid'),
                required: { required: false, type: 'number', min: 0, max: 100, transform(value: string) { if (value) { return Number(value) } } },
                message: t('admin.activity.bonusrole_unit')
            },
            {
                name: 'bonusPayTeacherEnding2',
                label: t('admin.activity.bonusend'),
                required: { required: false, type: 'number', min: 0, max: 100, transform(value: string) { if (value) { return Number(value) } } },
                message: t('admin.activity.bonusrole_unit'),
                dependencies: 'bonusPayTeacherDuring2'
            }
        ]
    }

    return {
        formarea,
        formareamix,
        formTime,
        timeObj,
        formbonuesrole1,
        formbonuesrole2,
        formlimit
    }
}