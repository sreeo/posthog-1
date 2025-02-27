import { useValues } from 'kea'
import { teamLogic } from 'scenes/teamLogic'
import { PageHeader } from 'lib/components/PageHeader'
import { AlertMessage } from 'lib/components/AlertMessage'
import { Link } from 'lib/components/Link'
import { urls } from 'scenes/urls'
import { SceneExport } from 'scenes/sceneTypes'
import { SessionRecordingPlayer } from 'scenes/session-recordings/player/SessionRecordingPlayer'
import {
    sessionRecordingDetailLogic,
    SessionRecordingDetailLogicProps,
} from 'scenes/session-recordings/detail/sessionRecordingDetailLogic'
import { RecordingNotFound } from 'scenes/session-recordings/player/RecordingNotFound'

export const scene: SceneExport = {
    logic: sessionRecordingDetailLogic,
    component: SessionRecordingDetail,
    paramsToProps: ({ params: { id } }): typeof sessionRecordingDetailLogic['props'] => ({
        id,
    }),
}

export function SessionRecordingDetail({ id }: SessionRecordingDetailLogicProps = {}): JSX.Element {
    const { currentTeam } = useValues(teamLogic)
    return (
        <div>
            <PageHeader title={<div>Recording</div>} />
            {currentTeam && !currentTeam?.session_recording_opt_in ? (
                <div className="mb-4">
                    <AlertMessage type="info">
                        Session recordings are currently disabled for this project. To use this feature, please go to
                        your <Link to={`${urls.projectSettings()}#recordings`}>project settings</Link> and enable it.
                    </AlertMessage>
                </div>
            ) : null}
            <div className="border rounded mt-4">
                {id ? (
                    <SessionRecordingPlayer sessionRecordingId={id} playerKey={`${id}-detail`} isDetail />
                ) : (
                    <RecordingNotFound />
                )}
            </div>
        </div>
    )
}
