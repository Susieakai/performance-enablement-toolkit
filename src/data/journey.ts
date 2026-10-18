/** 绩效赋能旅程 / RACI / 升级触发条件 —— 文案忠实源材料，组件只负责渲染 */

export interface JourneyStep {
  id: number
  name: string
  en: string
  purpose: string
  tool: string
  toolIntro: string
  /** Leader 在该阶段的核心职责（从 RACI 提炼一句话） */
  leaderDuty: string
  /** 是否为工具卡详情入口 */
  toolEntry?: boolean
}

export const journeySteps: JourneyStep[] = [
  {
    id: 1,
    name: '诊断绩效问题',
    en: 'Diagnose',
    purpose: '基于事实厘清员工绩效问题的根因',
    tool: '绩效问题诊断卡 T-01',
    toolIntro: '梳理绩效事实、根本原因及赋能方向。',
    leaderDuty: 'Leader 主责（R/A）：收集绩效事实，判断根因。',
  },
  {
    id: 2,
    name: '制定绩效赋能计划',
    en: 'Plan',
    purpose: '针对根因制定可落地的赋能计划',
    tool: '绩效赋能计划卡 T-02',
    toolIntro: '明确赋能目标、衡量标准、完成时限及支持措施。',
    leaderDuty: 'Leader 主责（R/A）：根据根因制定赋能计划并明确支持。',
  },
  {
    id: 3,
    name: '初次沟通·开启计划',
    en: 'Initiate',
    purpose: '与员工就问题与计划达成共识、正式启动',
    tool: '初次绩效沟通卡 T-03',
    toolIntro: '分步引导完成初次沟通：准备、开启计划、发送确认邮件。',
    leaderDuty: 'Leader 主责（R/A）：完成初次沟通；员工确认赋能计划及努力方向。',
    toolEntry: true,
  },
  {
    id: 4,
    name: '绩效跟进',
    en: 'Check-in',
    purpose: '阶段性跟踪进展、及时给予支持与反馈',
    tool: '绩效跟进沟通卡 T-04',
    toolIntro: '按约定节奏开展阶段性跟进沟通。',
    leaderDuty: 'Leader 主责（R/A）：按约定节奏跟进，及时反馈并提供支持。',
  },
  {
    id: 5,
    name: '赋能结果确认',
    en: 'Confirm',
    purpose: '对照目标判定赋能结果，明确后续路径',
    tool: '赋能结果确认卡 T-05',
    toolIntro: '对照目标判定赋能结果，明确后续路径。',
    leaderDuty: 'Leader 主责（R/A）：判定赋能结果，完成结果沟通。',
  },
]

/* ---------------- RACI 分工矩阵 ---------------- */

export interface RaciCell {
  marks: string[]
  note: string
}

export interface RaciRow {
  stage: string
  leader: RaciCell
  pp: RaciCell
  senior: RaciCell
  employee: RaciCell
}

export type RaciRoleKey = 'leader' | 'pp' | 'senior' | 'employee'

export const raciRoles: { key: RaciRoleKey; label: string }[] = [
  { key: 'leader', label: 'Leader' },
  { key: 'pp', label: 'PP' },
  { key: 'senior', label: 'Senior Leader' },
  { key: 'employee', label: '员工' },
]

const NONE: RaciCell = { marks: [], note: '—' }

export const raciRows: RaciRow[] = [
  {
    stage: '① 诊断绩效问题',
    leader: { marks: ['R', 'A'], note: '收集绩效事实判断根因' },
    pp: { marks: ['C'], note: '支持 Leader 识别绩效根因' },
    senior: { marks: ['I'], note: '' },
    employee: NONE,
  },
  {
    stage: '② 制定绩效赋能计划',
    leader: { marks: ['R', 'A'], note: '根据根因制定赋能计划 & 明确支持' },
    pp: { marks: ['C'], note: '确保赋能计划符合管理规范' },
    senior: { marks: ['C'], note: '确保赋能计划的业务合理性' },
    employee: NONE,
  },
  {
    stage: '③ 初次沟通·开启计划',
    leader: { marks: ['R', 'A'], note: '完成初次沟通' },
    pp: { marks: ['C'], note: '复杂沟通支持' },
    senior: { marks: ['C'], note: '复杂沟通支持' },
    employee: { marks: ['R'], note: '明确绩效问题，确认赋能计划及努力方向' },
  },
  {
    stage: '④ 绩效跟进',
    leader: { marks: ['R', 'A'], note: '按约定节奏跟进，及时反馈并提供支持' },
    pp: NONE,
    senior: NONE,
    employee: { marks: ['R'], note: '及时改进并积极沟通' },
  },
  {
    stage: '⑤ 赋能结果确认',
    leader: { marks: ['R', 'A'], note: '判定赋能结果，完成结果沟通' },
    pp: { marks: ['C'], note: '确保结果判定及后续路径符合管理规范' },
    senior: { marks: ['C'], note: '结果为红灯时，确认是否升级 PIP' },
    employee: NONE,
  },
]

export const raciLegend = 'R = 执行者 · A = 最终负责 · C = 被咨询 · I = 被知会'

export const raciNote =
  '"Senior Leader"指管理者的上级。①–④ 阶段由管理者主导、PP 支持；⑤ 阶段如结果为红灯，需经 Senior Leader 确认后，Leader 与 PP 共同协作正式开启 PIP 程序。'

/* ---------------- 即刻升级触发条件 ---------------- */

export const escalationTitle =
  '出现以下任一情形，无论处于哪个阶段、不受节奏限制，都应立即联系 PP'

export const escalationTriggers: string[] = [
  '员工提出投诉、仲裁风险或涉及法律的表态',
  '案例涉及合规、员工关系（ER）或特殊身份（孕期、工伤、医疗期等）',
  '严重冲突导致正常沟通无法进行',
  '出现明显的情绪或心理健康风险信号',
]
