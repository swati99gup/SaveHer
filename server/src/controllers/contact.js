import User from "../models/User.js";

export const addContact =
async (req, res) => {

  try {

    const { email } = req.body;

    // FIND USER

    const contactUser =

      await User.findOne({
        email
      });

    if (!contactUser) {

      return res.status(404).json({

        message:
          "User not found"
      });
    }

    const user =

      await User.findById(
        req.user.id
      );

    // AVOID DUPLICATES

    const alreadyAdded =

      user.emergencyContacts.includes(
        contactUser._id
      );

    if (alreadyAdded) {

      return res.json({

        message:
          "Already Added"
      });
    }

    user.emergencyContacts.push(
      contactUser._id
    );

    await user.save();

    res.json({

      message:
        "Emergency Contact Added"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      error:
        err.message
    });
  }
};
export const getContacts =
async (req, res) => {

  try {

    const user =

      await User.findById(
        req.user.id
      ).populate(

        "emergencyContacts",

        "name email phone"
      );

    res.json(
      user.emergencyContacts
    );

  } catch (err) {

    res.status(500).json({

      error:
        err.message
    });
  }
};
export const deleteContact = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.user.id
    );

    user.emergencyContacts =
      user.emergencyContacts.filter(

        (contact) =>

          contact._id.toString() !==
          req.params.id
      );

    await user.save();

    res.json({
      message: "Contact Deleted"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};