import mock from "mockjs"
import homeApi from "./mockServeData/home"
import userApi from "./mockServeData/user"
import permissionApi from "./mockServeData/permission"
mock.mock('/home/getData',homeApi.getStatisticalData)
mock.mock('/user/add','post',userApi.createUser)
mock.mock('/user/edit','post',userApi.updateUser)
mock.mock('/user/getUser','get',userApi.getUserList)
mock.mock('/user/del','get',userApi.deleteUser)
mock.mock('/permission/getMenu','post',permissionApi.getMenu)