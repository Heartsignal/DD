const getters = {
  sidebar: state =>state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  id: state => state.user.id,
  haveCourseIds: state => state.user.haveCourseIds,
  role: state => state.user.role
}
export default getters
