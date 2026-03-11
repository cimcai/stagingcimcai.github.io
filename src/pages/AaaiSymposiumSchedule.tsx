import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import tw from "twin.macro"
import scheduleData from "../data/symposiumSchedule"

/* ------------------------------------------------------------------ */
/*  Interfaces                                                         */
/* ------------------------------------------------------------------ */

export interface ScheduleEntry {
  title: string
  speaker: string
  abstract?: string
}

export interface ScheduleRow {
  time: string
  rowType: "keynote" | "paper" | "lightning" | "discussion" | "break"
  content?: string
  activityLabel?: string
  title?: string
  speaker?: string
  abstract?: string
  entries?: ScheduleEntry[]
}

export interface ScheduleSession {
  title: string
  rows: ScheduleRow[]
}

export interface ScheduleDay {
  label: string
  sessions: ScheduleSession[]
}

/* ------------------------------------------------------------------ */
/*  Overlay chrome                                                      */
/* ------------------------------------------------------------------ */

const Dialog = styled.dialog`
  ${tw`
    bg-white
    w-full
    h-full
    md:w-[920px]
    md:h-[90vh]
    md:rounded-[12px]
    relative
  `}
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
  border: none;
  padding: 0;
  max-width: none;
  max-height: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
`

const PanelHeader = styled.div`
  ${tw`
    px-4
    sm:px-6
    md:px-10
    pt-6
    md:pt-10
    pb-4
    md:pb-6
    relative
  `}
  flex-shrink: 0;
  border-bottom: 1px solid #e2e8f0;
`

const CloseButton = styled.button`
  ${tw`
    absolute
    top-3
    right-3
    md:top-4
    md:right-4
    z-10
    w-9
    h-9
    md:w-10
    md:h-10
    rounded-full
    flex
    items-center
    justify-center
    transition-colors
    duration-150
  `}
  background: rgba(242, 242, 247, 0.9);
  border: 1px solid #e2e8f0;
  color: rgba(24, 29, 39, 0.6);
  cursor: pointer;

  &:hover {
    background: #e2e8f0;
    color: rgba(24, 29, 39, 0.9);
  }
`

const PanelBody = styled.div`
  ${tw`
    px-4
    sm:px-6
    md:px-10
    py-4
    md:py-6
  `}
  flex: 1;
  overflow-y: auto;
`

/* ------------------------------------------------------------------ */
/*  Schedule styled components                                          */
/* ------------------------------------------------------------------ */

const TitleBlock = styled.div`
  ${tw`
    flex
    flex-col
    gap-[10px]
    md:gap-[16px]
    mb-3
    md:mb-4
    pr-10
  `}
`

const Title = styled.h2`
  ${tw`
    text-[28px]
    sm:text-[32px]
    md:text-[44px]
    leading-[1.08]
    md:leading-[1.05]
    text-cimc_dark
  `}
  font-family: "Questrial", "questrial", "sans-serif";
  letter-spacing: -2.24px;
`

const Subtitle = styled.p`
  ${tw`
    text-[16px]
    sm:text-[18px]
    md:text-[20px]
  `}
  color: rgba(24, 29, 39, 0.6);
  letter-spacing: -0.72px;
`

/* -- Legend -------------------------------------------------------- */

const Legend = styled.div`
  ${tw`
    flex
    gap-4
    flex-wrap
    text-[13px]
    md:text-[14px]
    mb-2
  `}
  color: rgba(24, 29, 39, 0.55);
`

const LegendItem = styled.span`
  ${tw`
    inline-flex
    items-center
    gap-[6px]
  `}
`

const LegendDot = styled.span<{ $color: string }>`
  ${tw`
    w-[10px]
    h-[10px]
    inline-block
  `}
  border-radius: 2px;
  background: ${({ $color }) => $color};
`

/* -- Day Header --------------------------------------------------- */

const DayHeaderDiv = styled.div`
  ${tw`
    text-[20px]
    md:text-[24px]
    text-cimc_dark
    mt-8
    mb-1
    pb-2
  `}
  font-family: "Questrial", "questrial", "sans-serif";
  letter-spacing: -0.72px;
  font-weight: 700;
  border-bottom: 1px solid #181d27;
`

/* -- Session Block ------------------------------------------------ */

const SessionBlockDiv = styled.div`
  ${tw`
    my-5
    overflow-hidden
  `}
  border: 1px solid #e2e8f0;
  border-radius: 0 10px 0 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`

const SessionTitleDiv = styled.div`
  ${tw`
    px-4
    py-[10px]
    text-[15px]
    md:text-[16px]
    text-cimc_dark
  `}
  font-weight: 600;
  background: #f2f2f7;
  border-bottom: 1px solid #e2e8f0;
`

/* -- Schedule Row ------------------------------------------------- */

const ScheduleRowDiv = styled.div<{ $rowType: string }>`
  display: grid;
  grid-template-columns: 160px 1fr;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.875rem;

  &:last-child {
    border-bottom: none;
  }

  ${({ $rowType }) => {
    switch ($rowType) {
      case "keynote":
        return "background: #ebf4ff;"
      case "paper":
        return "background: #f0fff4;"
      case "lightning":
        return "background: #fefcf3;"
      case "discussion":
        return "background: #f0fdfa;"
      default:
        return ""
    }
  }}

  @media (max-width: 600px) {
    grid-template-columns: 120px 1fr;
  }
`

const TimeCol = styled.div`
  ${tw`
    py-2
    px-3
    whitespace-nowrap
  `}
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: rgba(24, 29, 39, 0.5);
  border-right: 1px solid #e2e8f0;
  display: flex;
  align-items: flex-start;
  padding-top: 0.6rem;
  font-size: 0.8rem;

  @media (max-width: 600px) {
    font-size: 0.75rem;
    padding: 0.4rem 0.5rem;
  }
`

const ContentCol = styled.div`
  ${tw`
    py-2
    px-3
  `}
  min-width: 0;
  overflow-wrap: break-word;
`

const BreakContent = styled.div`
  color: rgba(24, 29, 39, 0.4);
  font-style: italic;
`

/* -- Activity badges ---------------------------------------------- */

const ActivityType = styled.span<{ $type: string }>`
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  margin-right: 0.35rem;
  vertical-align: middle;
  position: relative;
  top: -1px;

  ${({ $type }) => {
    switch ($type) {
      case "keynote":
        return "background: #bee3f8; color: #2a4365;"
      case "paper":
        return "background: #c6f6d5; color: #22543d;"
      case "lightning":
        return "background: #fefcbf; color: #744210;"
      case "discussion":
        return "background: #b2f5ea; color: #234e52;"
      default:
        return ""
    }
  }}
`

const ActivityTitle = styled.span`
  font-weight: 600;
  color: #181d27;
`

const Speaker = styled.div`
  color: rgba(24, 29, 39, 0.55);
  font-size: 0.8rem;
  margin-top: 0.15rem;
`

/* -- Entry items (grouped talks) ---------------------------------- */

const EntryItemDiv = styled.div`
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }
`

/* -- Abstract toggle ---------------------------------------------- */

const AbstractToggleBtn = styled.button`
  ${tw`
    ml-2
  `}
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 3px;
  font-size: 0.7rem;
  color: #626dd6;
  cursor: pointer;
  padding: 0.1rem 0.4rem;
  transition: background 0.15s;

  &:hover {
    background: #f2f2f7;
  }
`

const AbstractTextDiv = styled.div`
  margin-top: 0.35rem;
  padding: 0.5rem 0.6rem;
  background: rgba(0, 0, 0, 0.02);
  border-left: 2px solid #626dd6;
  font-size: 0.8rem;
  line-height: 1.55;
  color: rgba(24, 29, 39, 0.7);
  border-radius: 0 4px 4px 0;
`

/* -- Footer note -------------------------------------------------- */

const ScheduleFooter = styled.div`
  ${tw`
    mt-8
    pt-4
    text-center
    text-[13px]
    md:text-[14px]
  `}
  border-top: 1px solid #e2e8f0;
  color: rgba(24, 29, 39, 0.5);
`

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface AaaiSymposiumScheduleProps {
  onClose: () => void
}

const AaaiSymposiumSchedule = ({ onClose }: AaaiSymposiumScheduleProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const [visibleAbstracts, setVisibleAbstracts] = useState<Set<string>>(
    new Set(),
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    dialog.showModal()

    const handleClose = () => onCloseRef.current()
    dialog.addEventListener("close", handleClose)
    return () => dialog.removeEventListener("close", handleClose)
  }, [])

  const toggleAbstract = (id: string) => {
    setVisibleAbstracts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const renderAbstract = (id: string, text: string) => {
    const expanded = visibleAbstracts.has(id)
    const regionId = `abstract-${id}`
    return (
      <>
        <AbstractToggleBtn
          type="button"
          onClick={() => toggleAbstract(id)}
          aria-expanded={expanded}
          aria-controls={regionId}
        >
          {expanded ? "Hide abstract" : "Show abstract"}
        </AbstractToggleBtn>
        {expanded && <AbstractTextDiv id={regionId}>{text}</AbstractTextDiv>}
      </>
    )
  }

  const renderEntry = (entry: ScheduleEntry, absId: string) => (
    <EntryItemDiv key={absId}>
      <div>
        <ActivityTitle>{entry.title}</ActivityTitle>
        {entry.abstract && renderAbstract(absId, entry.abstract)}
      </div>
      <Speaker>{entry.speaker}</Speaker>
    </EntryItemDiv>
  )

  const renderRow = (
    row: ScheduleRow,
    dayIdx: number,
    sessionIdx: number,
    rowIdx: number,
  ) => {
    const baseId = `${dayIdx}-${sessionIdx}-${rowIdx}`

    if (row.rowType === "break") {
      return (
        <ScheduleRowDiv key={baseId} $rowType="break">
          <TimeCol>{row.time}</TimeCol>
          <ContentCol>
            <BreakContent>{row.content}</BreakContent>
          </ContentCol>
        </ScheduleRowDiv>
      )
    }

    if (row.entries && row.entries.length > 0) {
      return (
        <ScheduleRowDiv key={baseId} $rowType={row.rowType}>
          <TimeCol>{row.time}</TimeCol>
          <ContentCol>
            {row.activityLabel && (
              <div>
                <ActivityType $type={row.rowType}>
                  {row.activityLabel}
                </ActivityType>
              </div>
            )}
            {row.entries.map((entry, entryIdx) =>
              renderEntry(entry, `${baseId}-${entryIdx}`),
            )}
          </ContentCol>
        </ScheduleRowDiv>
      )
    }

    return (
      <ScheduleRowDiv key={baseId} $rowType={row.rowType}>
        <TimeCol>{row.time}</TimeCol>
        <ContentCol>
          <div>
            {row.activityLabel && (
              <ActivityType $type={row.rowType}>
                {row.activityLabel}
              </ActivityType>
            )}
            {row.title && <ActivityTitle>{row.title}</ActivityTitle>}
            {row.abstract && renderAbstract(`${baseId}`, row.abstract)}
          </div>
          {row.speaker && <Speaker>{row.speaker}</Speaker>}
        </ContentCol>
      </ScheduleRowDiv>
    )
  }

  const renderSession = (
    session: ScheduleSession,
    dayIdx: number,
    sessionIdx: number,
  ) => (
    <SessionBlockDiv key={`${dayIdx}-${sessionIdx}`}>
      <SessionTitleDiv>{session.title}</SessionTitleDiv>
      {session.rows.map((row, rowIdx) =>
        renderRow(row, dayIdx, sessionIdx, rowIdx),
      )}
    </SessionBlockDiv>
  )

  const renderDay = (day: ScheduleDay, dayIdx: number) => (
    <div key={dayIdx}>
      <DayHeaderDiv>{day.label}</DayHeaderDiv>
      {day.sessions.map((session, sessionIdx) =>
        renderSession(session, dayIdx, sessionIdx),
      )}
    </div>
  )

  return (
    <Dialog
      ref={dialogRef}
      aria-labelledby="schedule-dialog-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <CloseButton type="button" onClick={onClose} aria-label="Close schedule">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CloseButton>

      <PanelHeader>
        <TitleBlock>
          <Title id="schedule-dialog-title">Program Schedule</Title>
          <Subtitle>
            AAAI 2026 Spring Symposium on Machine Consciousness: Integrating
            Theory, Technology, and Philosophy {"\u00b7"} April 7{"\u2013"}9,
            2026
          </Subtitle>
        </TitleBlock>

        <Legend>
          <LegendItem>
            <LegendDot $color="#bee3f8" /> Keynote
          </LegendItem>
          <LegendItem>
            <LegendDot $color="#c6f6d5" /> Paper (25 min)
          </LegendItem>
          <LegendItem>
            <LegendDot $color="#fefcbf" /> Lightning (10 min)
          </LegendItem>
          <LegendItem>
            <LegendDot $color="#b2f5ea" /> Discussion
          </LegendItem>
        </Legend>
      </PanelHeader>

      <PanelBody>
        {scheduleData.map((day, dayIdx) => renderDay(day, dayIdx))}

        <ScheduleFooter>
          AAAI 2026 Spring Symposium Series {"\u00b7"} Machine Consciousness:
          Integrating Theory, Technology, and Philosophy (SSS-26)
        </ScheduleFooter>
      </PanelBody>
    </Dialog>
  )
}

export default AaaiSymposiumSchedule
