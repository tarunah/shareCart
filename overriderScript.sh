#Usage
#sh overriderScript.sh "myx-config:branch1" "myx:branch2" "mynthome:"
#The above script would
#1. Install the branch1 of myx-config
#2. Prepublish myx-config
#3. Install the branch2 of myx
#4. Prepublish myx
#5. Prepublish mynthome
array=("$@")
for i in "${array[@]}"; do
	rb=($(echo ${i} | tr ':' ' '));
	repo="${rb[0]}";
	branch="${rb[1]}";
	echo ${repo};
	echo ${branch};

	echo "^^^${repo}";
	if [[ -z "${branch}" ]]; then
		echo "Not overriding ${repo}. Only prepublishing."
	else
		find node_modules -type d -name ${repo} -exec rm -rf {} +
		npm --color false --spin false --cache _npmcache install git+ssh://git@bitbucket.org:myntra/${repo}.git#${branch}
	fi
	if [[ $? != 0 ]]; then exit 1; fi
	echo "^^^prepublish ${repo}"
	cd node_modules/${repo};
	npm run prepublish
	cd ../..
	if [[ $? != 0 ]]; then exit 1; fi
done