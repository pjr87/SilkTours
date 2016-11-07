class User:
    props = {}
    PROPS = ["name", "profile_picture", "intrests", "location", "tours_taking", "tours_completed"
             "phone", "description", "dob"];

    def __init__(self, id):
        self.props["id"] = id;
        self.props["name"] = "Andrew Shidel"
        self.props["profile_picture"] = "https://s3.amazon.com/silktours/somebucket/someimage.jpg"
        self.props["intrests"] = ["Sports", "Beer", "Nature"]
        self.props["location"] = "Philadelphia"
        self.props["tours_taking"] = ["tour_id_1", "tour_id_2"]
        self.props["tours_completed"] = ["tour_id_3", "tour_id_3"]
        self.props["phone"] = "412-651-0498"
        self.props["description"] = "This is a user."
        self.props["dob"] = "11/11/1991"

    def setProps(self, props):
        for key in props:
            if key not in self.PROPS:
                raise Exception('Invalid key: ' + key)
            self.props[key] = props[key]

    def serialize(self):
        return self.props

    def commit(self):
        # TODO
        print ("Saving " + name + " in the database...")
