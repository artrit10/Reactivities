import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react";


const ActivityList = () => {

    const { activityStore } = useStore()

    return (
        <>
            {activityStore.groupActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                    {activities.map(activity => (
                        <ActivityListItem activity={activity} key={activity.id}></ActivityListItem>
                    ))}

                </Fragment>
            ))}
        </>

    )
}

export default observer(ActivityList);