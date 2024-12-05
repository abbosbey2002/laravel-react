const Categoryspan = ({ id, categories }) => {
    const category = categories.find((category) => category.id === id);

    return <span>{category.name}</span>;
};

export default Categoryspan;
