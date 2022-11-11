import Icon from "../Icon";

function UserSocial({ social }) {
    console.log({ social })
    return (
        <a href={social.url} className="w-8 h-8 hover:scale-125 transition ease-in-out delay-100">
            <Icon name={social.platform} />
        </a>

    )
}

export default UserSocial