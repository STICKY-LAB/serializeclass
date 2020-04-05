import SerializableControllerClass from "../Serializable/SerializableControllerClass";
import SerializableInstance from "../../Serializable/SerializableInstance";
import InstanceData from "../../Data/InstanceData";
import { Import, ID } from "../../Serializable/SerializableClass";
import SerializableDependentControllerClass from "../Serializable/SerializableDependentControllerClass";


export type DependentControllerClassLoader<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID>> = (id : ID) => SerializableDependentControllerClass<TARGET, ID, DATA, INSTANCE>

function dependentControllerFromData<TARGET extends SerializableInstance<ID>, ID, DATA, INSTANCE extends SerializableInstance<ID>>(target : TARGET, instanceData : DATA, classLoader : DependentControllerClassLoader<TARGET, ID, DATA, INSTANCE>) : INSTANCE {
    const instance = classLoader(target[ID])[Import](
        target,
        instanceData,
        (target : TARGET, instanceData : DATA) => {
            return dependentControllerFromData(target, instanceData, classLoader);
        }
    );
    instance[ID] = target[ID];

    return instance;
}

export default dependentControllerFromData;